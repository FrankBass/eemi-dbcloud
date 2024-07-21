import LikesApi from './services/likes.js';
import ArticlesApi from './services/articles.js';
import { user } from './security.js';

const showLikesButton = document.getElementById("show-likes-button");
const likesModal = document.getElementById("likes-modal");
const closeLikesModal = document.getElementById("close-likes-modal");
const likesList = document.getElementById("likes-list");

showLikesButton.addEventListener("click", async () => {
  try {
    const likes = await LikesApi.getUserLikes(user.id);
    likesList.innerHTML = '';

    for (const like of likes) {
      const article = await ArticlesApi.get(like.article_id);
      const li = document.createElement("li");
      li.textContent = article.title;
      likesList.appendChild(li);
    }

    likesModal.style.display = "block";
  } catch (error) {
    console.error(error);
  }
});

closeLikesModal.addEventListener("click", () => {
  likesModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === likesModal) {
    likesModal.style.display = "none";
  }
});
