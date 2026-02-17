export async function setToken(token) {
  await chrome.storage.local.set({ token });
}

export async function getToken() {
  const res = await chrome.storage.local.get("token");
  return res.token || null;
}

export async function clearToken() {
  await chrome.storage.local.remove("token");
}
