import { apiCall } from "../api/api.js";

let processing = new Set();

chrome.runtime.onMessage.addListener(async (msg) => {
  if (msg.type !== "SOLVED") return;

  if (processing.has(msg.slug)) return;
  processing.add(msg.slug);

  try {
    await apiCall(`/extension/process?slug=${msg.slug}`, {
      method: "POST"
    });
    console.log("Synced:", msg.slug);
  } catch (e) {
    console.log("Sync failed → retry later");
  }

  setTimeout(() => processing.delete(msg.slug), 10000);
});
