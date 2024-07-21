import CommentsApi from "./services/comments.js";

document.getElementById("comment-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const commentData = Object.fromEntries(formData.entries());
  commentData.articleId = articleId;

  try {
    await CommentsApi.create(commentData);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
});
