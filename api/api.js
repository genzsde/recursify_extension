import { getToken, clearToken } from "../utils/storage.js";

const BASE = "http://localhost:8080";

export async function apiCall(url, options = {}) {
  const token = await getToken();

  const res = await fetch(BASE + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {})
    }
  });

  if (res.status === 401) {
    await clearToken();
    throw new Error("Unauthorized");
  }

  return res.json();
}
