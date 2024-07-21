import "./security.js";
import UsersApi from "./services/users.js";

document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const credentials = Object.fromEntries(formData.entries());

  try {
    const session = await UsersApi.login(credentials);
    if (!session) {
      document.getElementById("errors").textContent = "Invalid credentials";
    } else {
      localStorage.setItem("token", session.access_token);
      window.location.href = "/";
    }
  } catch (error) {
    document.getElementById("errors").textContent = "Error during login";
    console.error(error);
  }
});
