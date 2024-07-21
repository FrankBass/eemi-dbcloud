const loginNavElem = document.getElementById("nav-login");
const userInfosSpanElem = document.getElementById("nav-userinfos");

const token = localStorage.getItem("token");
export const user = {
  id: null,
};

if (token) {
  if (window.location.pathname === "/login.html") {
    window.location.href = "/";
  }

  if (userInfosSpanElem) {
    const [, payload] = token.split(".");
    const infos = JSON.parse(atob(payload));
    const textNode = document.createTextNode(infos.user_id);
    user.id = infos.user_id;
    userInfosSpanElem.appendChild(textNode);
    userInfosSpanElem.style.display = "block";
  }
} else {
  if (loginNavElem) loginNavElem.style.display = "block";
}
