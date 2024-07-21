import ArticlesApi from "./services/articles.js";
import CommentsApi from "./services/comments.js";
import LikesApi from "./services/likes.js";
import { user } from "./security.js"; 

const searchParams = new URLSearchParams(window.location.search);
const articleId = searchParams.get("id");

if (!articleId) {
  console.error("Article ID is missing from URL.");
  document.body.innerHTML = "<p>Article ID is missing from URL.</p>";
} else {
  loadArticle();
}

async function loadArticle() {
  try {
    const article = await ArticlesApi.get(articleId);

    if (!article) {
      throw new Error("Article not found");
    }

    console.log(article); 

    const ArticleTitleH1 = document.getElementById("article-title");
    const ArticleContentP = document.getElementById("article-content");
    const ArticleImg = document.getElementById("article-image");
    const ArticleAuthorP = document.getElementById("article-author");
    const CommentsSection = document.getElementById("comments-section");
    const LikeButton = document.getElementById("like-button");

    ArticleTitleH1.textContent = article.title;
    ArticleContentP.textContent = article.content;

    if (article.user) {
      ArticleAuthorP.textContent = `By ${article.user.pseudo} - Updated at ${new Date(article.updated_at).toLocaleString()}`;
    } else {
      ArticleAuthorP.textContent = `Author unknown - Updated at ${new Date(article.updated_at).toLocaleString()}`;
    }

    if (article.image_url) {
      ArticleImg.src = article.image_url;
      ArticleImg.style.display = "block";
    }

    const comments = await CommentsApi.getAll(articleId);
    console.log(comments); 
    CommentsSection.innerHTML = '';
    comments.forEach(comment => {
      const commentElem = createCommentElement(comment);
      CommentsSection.appendChild(commentElem);
    });

    LikeButton.addEventListener("click", async () => {
      if (!user.id) {
        alert("Please log in to like this article.");
        window.location.href = '/login.html'; 
        return;
      }
      try {
        console.log("User ID before like action:", user.id); 
        await LikesApi.toggleLike(article.id, user.id); 
        updateLikesCount();
      } catch (error) {
        console.error(error);
        alert(`Error: ${error.message}`);
      }
    });

    updateLikesCount();
  } catch (error) {
    console.error(error);
    document.body.innerHTML = `<p>Error loading article: ${error.message}</p>`;
  }
}

async function updateLikesCount() {
  const count = await LikesApi.getCount(articleId);
  const LikesCount = document.getElementById("likes-count");
  LikesCount.textContent = count;
}

function createCommentElement(comment) {
  const div = document.createElement("div");
  div.className = "comment";

  const author = document.createElement("p");
  if (comment.user) {
    author.textContent = `By ${comment.user.pseudo} - ${new Date(comment.created_at).toLocaleString()}`;
  } else {
    author.textContent = `Author unknown - ${new Date(comment.created_at).toLocaleString()}`;
  }
  author.className = "comment-author";

  const content = document.createElement("p");
  content.textContent = comment.content;

  div.appendChild(author);
  div.appendChild(content);

  return div;
}

document.getElementById("comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!user.id) {
    alert("Please log in to comment on this article.");
    window.location.href = '/login.html'; // Redirection vers la page de connexion
    return;
  }
  const formData = new FormData(e.target);
  const commentData = Object.fromEntries(formData.entries());
  commentData.article_id = articleId;

  try {
    await CommentsApi.create(commentData);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
});
