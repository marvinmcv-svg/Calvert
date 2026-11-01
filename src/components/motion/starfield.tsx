"use client";

import { useEffect, useRef } from "react";

/**
 * A slow, deep field of gold and ivory stars (a nod to the campus observatory at 3,600 m).
 * Three.js is loaded only when the canvas nears the viewport, renders only while visible,
 * follows the pointer with a gentle parallax, and draws one still frame for reduced motion.
 */
export function Starfield({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const boot = async () => {
      const THREE = await import("three");
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.setAttribute("aria-hidden", "true");
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 6;

      const COUNT = window.innerWidth < 768 ? 900 : 1800;
      const pos = new Float32Array(COUNT * 3);
      const size = new Float32Array(COUNT);
      const seed = new Float32Array(COUNT);
      const tint = new Float32Array(COUNT);
      for (let i = 0; i < COUNT; i++) {
        // A wide, shallow disc reads as a sky rather than a ball.
        const r = Math.pow(Math.random(), 0.6) * 14;
        const a = Math.random() * Math.PI * 2;
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
        pos[i * 3 + 2] = Math.sin(a) * r - 4;
        size[i] = Math.random() < 0.04 ? 3.2 + Math.random() * 2.5 : 0.8 + Math.random() * 1.6;
        seed[i] = Math.random() * 100;
        tint[i] = Math.random();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
      geo.setAttribute("aTint", new THREE.BufferAttribute(tint, 1));

      const mat = new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPixel: { value: renderer.getPixelRatio() },
          uGold: { value: new THREE.Color("#d2b97f") },
          uIvory: { value: new THREE.Color("#fbfaf6") },
        },
        vertexShader: /* glsl */ `
          attribute float aSize;
          attribute float aSeed;
          attribute float aTint;
          uniform float uTime;
          uniform float uPixel;
          varying float vTwinkle;
          varying float vTint;
          void main() {
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mv;
            vTwinkle = 0.55 + 0.45 * sin(uTime * (0.6 + fract(aSeed) * 1.4) + aSeed);
            vTint = aTint;
            gl_PointSize = aSize * uPixel * (11.0 / -mv.z);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uGold;
          uniform vec3 uIvory;
          varying float vTwinkle;
          varying float vTint;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            float core = smoothstep(0.5, 0.0, d);
            float glow = pow(core, 3.0);
            vec3 col = mix(uIvory, uGold, step(0.45, vTint));
            gl_FragColor = vec4(col, (glow * 1.1 + core * 0.25) * vTwinkle);
          }
        `,
      });
      const stars = new THREE.Points(geo, mat);
      scene.add(stars);

      const resize = () => {
        const w = el.clientWidth;
        const h = el.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
        pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      let raf = 0;
      let visible = false;
      const clock = new THREE.Clock();
      const frame = () => {
        const t = clock.getElapsedTime();
        mat.uniforms.uTime.value = t;
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;
        stars.rotation.y = t * 0.018 + pointer.x * 0.12;
        stars.rotation.x = pointer.y * 0.06;
        renderer.render(scene, camera);
        if (visible) raf = requestAnimationFrame(frame);
      };

      if (reduce) {
        mat.uniforms.uTime.value = 1.5;
        renderer.render(scene, camera);
      }
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !reduce;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(frame);
      });
      io.observe(el);

      // Fade the canvas in once the first frame is ready.
      renderer.domElement.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: reduce ? 0 : 1600, easing: "ease-out" });

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        geo.dispose();
        mat.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // Load three.js only when the section is about to be seen.
    const gate = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gate.disconnect();
          boot().catch(() => {
            /* WebGL unavailable: the section keeps its gradient background. */
          });
        }
      },
      { rootMargin: "400px 0px" },
    );
    gate.observe(el);

    return () => {
      disposed = true;
      gate.disconnect();
      cleanup?.();
    };
  }, []);

  return <div ref={host} aria-hidden className={className} />;
}
