import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import LoginPage from "../pages/Login/LoginPage";
import NotFoundPage from "../pages/Shared/NotFoundPage";

import DashboardHome from "../pages/Home/Home";
import AllCategories from "../pages/Categories/AllCategories";
import AddCategory from "../pages/Categories/AddCategory";
import CategoryDetails from "../pages/Categories/CategoryDetails";
import AllProducts from "../pages/Products/AllProducts";
import AddProduct from "../pages/Products/AddProduct";
import ProductDetails from "../pages/Products/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}

        {/* Protected Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="categories" element={<AllCategories />} />
          <Route path="categories/add" element={<AddCategory />} />
          <Route path="categories/:id" element={<CategoryDetails />} />

          <Route path="products" element={<AllProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
