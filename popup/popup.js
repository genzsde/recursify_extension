import { login, register } from "../utils/auth.js";
import { getToken, clearToken } from "../utils/storage.js";

const emailInput = document.getElementById("emailInput");
const passInput = document.getElementById("passInput");
const msg = document.getElementById("msg");

const loginBox = document.getElementById("loginBox");
const loggedBox = document.getElementById("loggedBox");

document.addEventListener("DOMContentLoaded", async () => {
  const token = await getToken();
  if (token) showLogged();
});

/* LOGIN */
document.getElementById("loginBtn").onclick = async () => {
  try {
    await login(emailInput.value, passInput.value);
    msg.innerText = "Login success ✅";
    showLogged();
  } catch (e) {
    msg.innerText = "Login failed ❌";
  }
};

/* REGISTER */
document.getElementById("registerBtn").onclick = async () => {
  try {
    await register(emailInput.value, passInput.value);
    msg.innerText = "Registered ✅ Now login";
  } catch (e) {
    msg.innerText = "Register failed ❌";
  }
};

/* LOGOUT */
document.getElementById("logoutBtn").onclick = async () => {
  await clearToken();
  location.reload();
};

function showLogged() {
  loginBox.style.display = "none";
  loggedBox.style.display = "block";
}
