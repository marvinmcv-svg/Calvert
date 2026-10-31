import sharp from 'sharp';
const R='/tmp/acs-raw/', I='/home/user/Calvert/public/images/acs/', B='/home/user/Calvert/public/brand/';
const photos = {
 'campus-courtyard':'img/ACS-Home-Eng.jpeg',
 'campus-playground':'img/ACS-Home-picture.gif',
 'campus-lawn-mountains':'img/Calvert-School-Home-ACS.gif',
 'history-early-campus':'img/About-Us-Calvert-School.gif',
 'early-childhood-sunhat':'img/ACS-Calvert-Elementary-home.gif',
 'secondary-students-ipads':'img/ACS-Calvet-Join-us.gif',
 'graduates-trio':'img/acd-alumni.gif',
 'graduates-70th':'img/ACS-CALVERT-home-graduates.gif',
 'graduation-faculty':'img/DSC01474.png',
 'graduation-class':'img/DSC08998.png',
 'elementary-ipad':'img/IMG_8887.jpg',
 'athletics-track':'img/Sports-5.png',
 'aquatics-pool':'img/swim-kid-1.png',
 'merch-sweatshirt':'img/Calvert-merch-notebook-grey-sweatshirt.png',
 'merch-notebook':'img/Calvert-merch-notebook.png',
 'open-house-flyer':'img/WhatsApp-Image-2025-11-11-at-12.01.09.jpeg',
 'team-maria-inarra':'img/WhatsApp-Image-2026-02-06-at-16.58.48.jpeg',
 'team-kim-philot':'img/Artboard-41-1.jpg',
 'team-ricardo-vieira':'img/Artboard-39-1.jpg',
 'team-ben-drury':'img/Artboard-40-1.jpg',
 'team-ana-maria-urquidi':'img/ANA-MARIA-URQUIDI-DSC_1532_2.jpg',
 'team-jared-mcgrath':'img/WhatsApp-Image-2026-08-23-at-12.20.47.jpg',
};
const out={};
for (const [k,f] of Object.entries(photos)) {
  const m = await sharp(R+f).rotate().resize({width:1800,height:1800,fit:'inside',withoutEnlargement:true}).flatten({background:'#ffffff'}).jpeg({quality:84,mozjpeg:true}).toFile(I+k+'.jpg');
  out[k]=[m.width,m.height];
}
console.log(JSON.stringify(out));
await sharp(R+'logo.png').toFile(B+'acs-calvert-logo.png');
await sharp(R+'fav.png').resize(512,512,{fit:'contain',background:{r:0,g:0,b:0,alpha:0}}).png().toFile(B+'acs-mark-512.png');
await sharp(R+'fav.png').resize(180,180,{fit:'contain',background:'#ffffff'}).flatten({background:'#ffffff'}).png().toFile(B+'acs-mark-180.png');
await sharp(R+'img/ACS-Cougars-Shield.gif').resize(900).png().toFile(B+'cougars-shield-70.png');
await sharp(R+'img/ACS-Calvert-Cougar-sticker.gif').resize(1200).png().toFile(B+'calvert-cougars-wordmark.png');
await sharp(R+'img/ACS-Sports.gif').resize(1000).png().toFile(B+'calvert-1955-2025.png');
await sharp(R+'img/ACS-Footer-Certifications.gif').png().toFile(B+'accreditations-strip.png');

// Monochrome white mark for dark surfaces (keeps alpha, star stays gold).
{
  const src = sharp(R + 'fav.png').resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const isStar = r > g && g > b && r > 120;
    const isWhiteBg = r > 235 && g > 235 && b > 235;
    if (isWhiteBg) { data[i + 3] = 0; continue; }
    if (!isStar) { data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; }
  }
  await sharp(data, { raw: info }).png().toFile(B + 'acs-mark-white-512.png');
}
// Transparent colour mark (white background knocked out).
{
  const { data, info } = await sharp(R + 'fav.png').resize(512, 512).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 235 && data[i + 1] > 235 && data[i + 2] > 235) data[i + 3] = 0;
  }
  await sharp(data, { raw: info }).png().toFile(B + 'acs-mark-512.png');
}
