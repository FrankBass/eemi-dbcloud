import ArticlesApi from "./services/articles.js";
import { user } from "./security.js";

const articleListElement = document.getElementById("article-list");
const createArticleButton = document.getElementById("create-article-button");
const articleFormContainer = document.getElementById("article-form-container");
const articleForm = document.getElementById("article-form");
const cancelArticleFormButton = document.getElementById("cancel-article-form");


if (user.id) {
  createArticleButton.style.display = "block";
}

createArticleButton.addEventListener("click", () => {
  articleForm.reset();
  document.getElementById("article-id").value = "";
  articleFormContainer.style.display = "block";
});

cancelArticleFormButton.addEventListener("click", () => {
  articleFormContainer.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === articleFormContainer) {
    articleFormContainer.style.display = "none";
  }
});

articleForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(articleForm);
  const articleData = Object.fromEntries(formData.entries());


  articleData.UserId = user.id;

  try {
    if (articleData.id) {
      await ArticlesApi.update(articleData.id, articleData);
    } else {
      await ArticlesApi.create(articleData);
    }
    articleFormContainer.style.display = "none";
    fetchArticles();
  } catch (error) {
    console.error(error);
  }
});

async function fetchArticles() {
  try {
    const articles = await ArticlesApi.getAll();
    articleListElement.innerHTML = '';
    articles.forEach(article => {
      const elem = createArticleItemElement(article);
      articleListElement.appendChild(elem);
    });
  } catch (error) {
    console.error(error);
  }
}

fetchArticles();

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
  author.textContent = `By ${article.author.pseudo}`;

  const excerpt = document.createElement("p");
  excerpt.className = "article-excerpt";
  excerpt.textContent = article.content.slice(0, 100) + "...";

  const a = document.createElement("a");
  a.href = `./article.html?id=${article.id}`;
  a.textContent = "Read More";

  const editButton = document.createElement("button");
  editButton.className = "btn btn-secondary";
  editButton.textContent = "Modifier";
  editButton.addEventListener("click", () => {
    document.getElementById("article-id").value = article.id;
    document.getElementById("title").value = article.title;
    document.getElementById("content").value = article.content;
    document.getElementById("image_url").value = article.image_url;
    document.getElementById("status").value = article.status;
    articleFormContainer.style.display = "block";
  });

  li.appendChild(img);
  li.appendChild(date);
  li.appendChild(title);
  li.appendChild(author);
  li.appendChild(excerpt);
  li.appendChild(a);
  li.appendChild(editButton);

  return li;
}


if (user.id) {
  createArticleButton.style.display = "block";
}
