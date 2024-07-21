import "./security.js";
import UsersApi from "./services/users.js";

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const userData = Object.fromEntries(formData.entries());

  try {
    await UsersApi.signup(userData);
    window.location.href = "/login.html";
  } catch (error) {
    document.getElementById("errors").textContent = "Error signing up. Please try again.";
    console.error(error);
  }
});
