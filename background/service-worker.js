import { apiCall } from "../api/api.js";

let processing = new Set();

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type !== "SOLVED") return;

  if (processing.has(msg.slug)) return;
  processing.add(msg.slug);

  try {
    const { slug, solvedAt, timezone } = msg;

    await apiCall(
      `/extension/process?slug=${slug}&solvedAt=${solvedAt}&timezone=${encodeURIComponent(timezone)}`,
      {
        method: "POST"
      }
    );
  } catch (e) {
  }

  setTimeout(() => processing.delete(msg.slug), 10000);
});
