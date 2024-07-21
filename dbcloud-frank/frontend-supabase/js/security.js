import supabase from './services/supabase.js';

const joinNavElem = document.querySelector(".join-button");
const loginNavElem = document.getElementById("nav-login");
const userInfosSpanElem = document.getElementById("nav-userinfos");
const logoutButton = document.createElement("a");

export const user = { id: null, email: null };

async function checkSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    console.error("Error getting session:", error);
    return;
  }

  const sessionUser = data?.session?.user;
  if (sessionUser) {
    user.id = sessionUser.id;
    user.email = sessionUser.email;
    userInfosSpanElem.textContent = sessionUser.email;
    userInfosSpanElem.style.display = "block";
    loginNavElem.style.display = "none";
    joinNavElem.style.display = "none";


    logoutButton.textContent = "Déconnexion";
    logoutButton.href = "#";
    logoutButton.className = "nav-link";
    logoutButton.addEventListener("click", async () => {
      await supabase.auth.signOut();
      window.location.reload();
    });

    userInfosSpanElem.insertAdjacentElement("afterend", logoutButton);
  } else {
    userInfosSpanElem.style.display = "none";
    loginNavElem.style.display = "block";
    joinNavElem.style.display = "block";

    if (logoutButton.parentNode) {
      logoutButton.parentNode.removeChild(logoutButton);
    }
  }
}

checkSession();
