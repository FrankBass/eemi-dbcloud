export default {
  async getAll() {
    const headers = {};
    if (localStorage.getItem("token")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    const resp = await fetch("/api/articles", {
      headers,
    });
    const data = await resp.json();
    return data;
  },
  async get(articleId) {
    const headers = {};
    if (localStorage.getItem("token")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    const resp = await fetch(`/api/articles/${articleId}`, {
      headers,
    });
    const data = await resp.json();
    return data;
  },
  async update(articleId, inputData) {
    const headers = {
      "Content-Type": "application/json",
    };
    if (localStorage.getItem("token")) {
      headers["Authorization"] = "Bearer " + localStorage.getItem("token");
    }
    const resp = await fetch(`/api/articles/${articleId}`, {
      method: "PUT",
      body: JSON.stringify(inputData),
      headers,
    });
    const data = await resp.json();
    return data;
  },
};
