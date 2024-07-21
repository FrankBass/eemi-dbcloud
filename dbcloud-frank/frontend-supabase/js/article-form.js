import ArticlesApi from "./services/articles.js";

document.getElementById("article-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const articleData = Object.fromEntries(formData.entries());

  try {
    await ArticlesApi.create(articleData);
    window.location.href = "/";
  } catch (error) {
    console.error(error);
  }
});
