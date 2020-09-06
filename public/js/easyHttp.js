class EasyHTTP {
  async get(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }

  async patch(url, data) {
    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.status;
  }

  async delete(url) {
    const res = await fetch(url, {
      method: "DELETE",
    });
    return res.status;
  }

  async post(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res;
  }
}
