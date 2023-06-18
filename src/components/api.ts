import axios from "axios";

const api = axios.create({
  baseURL: "/home",
});

export const getArticles = async (page: number, category: string) => {
  const response = await api.get(`?page=${page}&category=${category}`);
  return response.data;
};

export const deleteArticle = async (id: string) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

export const getArticlesByCategory = async (category: string) => {
  const response = await api.get(`?category=${category}`);
  return response.data;
};

export const getArticlesByFilter = async (filter: string) => {
  const response = await api.get(`?name=${filter}`);
  return response.data;
};
