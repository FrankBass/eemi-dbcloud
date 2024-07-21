
import "./security.js";
import UsersApi from "./services/users.js";

async function loadProfile() {
  try {
    const profile = await UsersApi.getProfile();
    document.getElementById("username").textContent = profile.pseudo;
    document.getElementById("email").textContent = profile.email;
  } catch (error) {
    console.error(error);
  }
}

document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/login.html";
});

loadProfile();
 