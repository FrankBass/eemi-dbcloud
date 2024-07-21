// frontend-supabase/js/article-like.js
import ArticlesApi from "./services/articles.js";
import LikesApi from "./services/likes.js";
import { user } from "./security.js";

const likesListElement = document.getElementById("likes-list");

async function fetchLikedArticles() {
  if (!user.id) {
    console.error("User is not logged in.");
    likesListElement.innerHTML = `<p>Vous devez être connecté pour voir vos articles aimés.</p>`;
    return;
  }

  try {
    const likes = await LikesApi.getUserLikes(user.id);
    likesListElement.innerHTML = '';

    for (const like of likes) {
      const article = await ArticlesApi.get(like.article_id);
      const elem = createArticleItemElement(article);
      likesListElement.appendChild(elem);
    }
  } catch (error) {
    console.error("Error fetching liked articles:", error);
    likesListElement.innerHTML = `<p>Erreur lors de la récupération des articles aimés.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', fetchLikedArticles);

function createArticleItemElement(article) {
  const li = document.createElement("li");
  li.className = "article-item";

  const img = document.createElement("img");
  img.src = article.image_url || "default-image.jpg";
  img.alt = article.title;

  const title = document.createElement("h2");
  title.textContent = article.title;

  const date = document.createElement("p");
  date.className = "article-date";
  date.textContent = new Date(article.updated_at).toLocaleDateString();

  const author = document.createElement("p");
  author.className = "article-author";
  author.textContent = `By ${article.user.pseudo}`;

  const excerpt = document.createElement("p");
  excerpt.className = "article-excerpt";
  excerpt.textContent = article.content.slice(0, 100) + "...";

  const a = document.createElement("a");
  a.href = `./article.html?id=${article.id}`;
  a.textContent = "Read More";

  li.appendChild(img);
  li.appendChild(date);
  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(excerpt);
  li.appendChild(a);

  return li;
}
