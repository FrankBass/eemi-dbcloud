import "./security.js";
import UsersApi from "./services/users.js";

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(e.currentTarget);
  /**
   * {id: 2, name: "foo"}
   * => [['id', 2], ["name", "foo"]]
   */
  const credentials = Object.fromEntries(formData.entries());
  UsersApi.login(credentials)
    .then((token) => {
      localStorage.setItem("token", token);
      window.location.href = "/";
    })
    .catch(() => {
      document
        .getElementById("errors")
        .appendChild(document.createTextNode("Invalid credentials"));
    });
});
