import API from './api.js';

export const register = (username, email, password) =>
  API.post("/auth/register", { username, email, password });

export const login = async (email, password) => {
  const { data } = await API.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);
  return data;
};

export const getUsers = () => API.get("/auth/users");
