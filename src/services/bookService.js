import api from "./api";

export const getBooks = async () => {
  const res = await api.get("/books");
  return res.data;
};



export const addBook = async (formData) => {
  const res = await api.post("/books", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateBook = async (id, book) => {
  const res = await api.put(`/books/${id}`, book);
  return res.data;
};

export const deleteBook = async (id) => {
  await api.delete(`/books/${id}`);
};
