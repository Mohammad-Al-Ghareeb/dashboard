/* eslint-disable no-useless-catch */
// src/store/categoryStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/categories`, {
        headers: getAuthHeaders(),
      });
      set({ categories: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  addCategory: async (formData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axios.post(`${API_BASE}/categories`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ categories: [...state.categories, res.data] }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  updateCategory: async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE}/categories/${id}`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat._id === id ? res.data : cat
        ),
      }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  deleteCategory: async (id) => {
    try {
      await axios.delete(`${API_BASE}/categories/${id}`, {
        headers: getAuthHeaders(),
      });
      set((state) => ({
        categories: state.categories.filter((cat) => cat._id !== id),
      }));
    } catch (err) {
      throw err;
    }
  },
}));

export default useCategoryStore;
