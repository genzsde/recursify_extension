import { setToken } from "./storage.js";
import { apiCall } from "../api/api.js";
import { setUser } from "./storage.js";

export async function login(email, password) {
  const res = await apiCall("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  await setToken(res.token);

  await setUser(res.name);

  return res;
}

export async function register(name, email, password) {
  return apiCall("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  });
}
