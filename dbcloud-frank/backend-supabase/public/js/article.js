import { user } from "./security.js";
import ArticlesApi from "./services/articles.js";

const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("id");
const progressBar = document.getElementById("loading");

ArticlesApi.get(articleId).then((article) => {
  const ArticleTitleH1 = document.getElementById("article-title");
  const ArticleContentP = document.getElementById("article-content");
  const ArticleExtraSpan = document.getElementById("article-extra");
  // If Author
  if (article.UserId === user.id) {
    ArticleTitleH1.setAttribute("contenteditable", true);
    ArticleTitleH1.addEventListener("blur", (e) => {
      ArticlesApi.update(article.id, { title: e.target.textContent }).then(() =>
        alert("Article updated")
      );
    });
    ArticleContentP.setAttribute("contenteditable", true);
    ArticleContentP.addEventListener("blur", (e) => {
      ArticlesApi.update(article.id, { content: e.target.textContent }).then(
        () => alert("Article updated")
      );
    });
  }

  ArticleTitleH1.appendChild(document.createTextNode(article.title));
  ArticleContentP.appendChild(document.createTextNode(article.content));
  ArticleExtraSpan.appendChild(
    document.createTextNode(
      `${article.UserId} - Updated at ${article.updatedAt}`
    )
  );
  progressBar.parentNode.removeChild(progressBar);
});
