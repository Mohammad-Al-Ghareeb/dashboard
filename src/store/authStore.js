// src/store/authStore.js
import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

// const API_BASE = "http://localhost:5000/api";
const API_BASE = API_BASE_URL;

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });
      set({ user: res.data.user, token: res.data.token, loading: false });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data.user;
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
      throw err;
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  loadUserFromStorage: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) set({ token, user: JSON.parse(user) });
  },
}));

export default useAuthStore;
