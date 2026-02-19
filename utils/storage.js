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

export async function setUser(name) {
  return chrome.storage.local.set({ name });
}

export async function getUser() {
  const data = await chrome.storage.local.get("name");
  return data.name;
}

export async function clearUser() {
  await chrome.storage.local.remove("name");
}