
import { getUser } from "../utils/storage.js";
import { login, register } from "../utils/auth.js";
import { getToken, clearToken, clearUser } from "../utils/storage.js";

const loginBox = document.getElementById("loginBox");
const registerBox = document.getElementById("registerBox");
const loggedBox = document.getElementById("loggedBox");

const loginEmail = document.getElementById("loginEmail");
const loginPass = document.getElementById("loginPass");
const loginMsg = document.getElementById("loginMsg");

const regName = document.getElementById("regName");
const regEmail = document.getElementById("regEmail");
const regPass = document.getElementById("regPass");
const registerMsg = document.getElementById("registerMsg");


document.addEventListener("DOMContentLoaded", async () => {
  const token = await getToken();
  if (token) showLogged();
});

document.getElementById("goRegister").onclick = () => {
  loginBox.style.display = "none";
  registerBox.style.display = "block";
};

document.getElementById("goLogin").onclick = () => {
  registerBox.style.display = "none";
  loginBox.style.display = "block";
};

document.getElementById("loginBtn").onclick = async () => {
  try {
    await login(loginEmail.value, loginPass.value);
    loginMsg.innerText = "Login successful ✅";
    showLogged();
  } catch (e) {
    loginMsg.innerText = "Login failed ❌";
    console.error(e);
  }
};

document.getElementById("registerBtn").onclick = async () => {
  try {
    await register(regName.value, regEmail.value, regPass.value);

    registerMsg.innerText = "Registered ✅ Please login";

    setTimeout(() => {
      registerBox.style.display = "none";
      loginBox.style.display = "block";
    }, 800);

  } catch (e) {
    registerMsg.innerText = "Register failed ❌";
    console.error(e);
  }
};

document.getElementById("logoutBtn").onclick = async () => {
 
  await clearToken();
  await clearUser();
  location.reload();
};

async function showLogged() {
  loginBox.style.display = "none";
  registerBox.style.display = "none";
  loggedBox.style.display = "block";

  const name = await getUser();

  document.querySelector("#loggedBox h3").innerText =
    `Hi, ${name || "User"} 👋`;
}

