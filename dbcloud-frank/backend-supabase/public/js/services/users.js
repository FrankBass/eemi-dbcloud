export default {
  async login(credentials) {
    const resp = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 401) throw new Error();
    const data = await resp.json();
    return data.token;
  },
};
