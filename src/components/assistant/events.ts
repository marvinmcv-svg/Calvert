export function openAssistant(prompt?: string) {
  window.dispatchEvent(new CustomEvent("acs:open-assistant", { detail: { prompt } }));
}
