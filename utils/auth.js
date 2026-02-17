import { setToken } from "./storage.js";
import { apiCall } from "../api/api.js";

export async function login(email, password) {
  const data = await apiCall("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });

  await setToken(data.token);
}

export async function register(email, password) {
  await apiCall("/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password })
  });
}
