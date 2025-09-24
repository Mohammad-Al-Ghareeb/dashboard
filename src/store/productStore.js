/* eslint-disable no-useless-catch */

// src/store/productStore.js
import { create } from "zustand";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_BASE}/products`, {
        headers: getAuthHeaders(),
      });
      set({ products: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || err.message,
        loading: false,
      });
    }
  },

  addProduct: async (formData) => {
    try {
      const res = await axios.post(`${API_BASE}/products`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({ products: [...state.products, res.data] }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  updateProduct: async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE}/products/${id}`, formData, {
        headers: {
          ...getAuthHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });
      set((state) => ({
        products: state.products.map((prod) =>
          prod._id === id ? res.data : prod
        ),
      }));
      return res.data;
    } catch (err) {
      throw err;
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${API_BASE}/products/${id}`, {
        headers: getAuthHeaders(),
      });
      set((state) => ({
        products: state.products.filter((prod) => prod._id !== id),
      }));
    } catch (err) {
      throw err;
    }
  },

  fetchProductById: async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/products/${id}`, {
        headers: getAuthHeaders(),
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
}));

export default useProductStore;
