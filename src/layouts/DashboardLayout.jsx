import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Home, Boxes, Tag, LogOut } from "lucide-react";
import useAuthStore from "../store/authStore";

export default function DashboardLayout() {
  const [openMenu, setOpenMenu] = useState({
    categories: false,
    products: false,
  });

  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col">
        <h2 className="mb-8 text-xl font-semibold text-neutral-800">
          Dashboard
        </h2>

        <nav className="space-y-3">
          {/* Home */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`
            }
          >
            <Home size={18} />
            Home
          </NavLink>

          {/* Categories */}
          <div>
            <button
              onClick={() =>
                setOpenMenu((prev) => ({
                  ...prev,
                  categories: !prev.categories,
                }))
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              <span className="flex items-center gap-3">
                <Tag size={18} />
                Categories
              </span>
              <span>{openMenu.categories ? "−" : "+"}</span>
            </button>

            {openMenu.categories && (
              <div className="ml-9 mt-2 space-y-2 text-sm">
                <NavLink
                  to="/dashboard/categories"
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-md bg-neutral-200 px-3 py-1 font-medium"
                      : "block rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                  }
                >
                  All Categories
                </NavLink>

                <NavLink
                  to="/dashboard/categories/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-md bg-neutral-200 px-3 py-1 font-medium"
                      : "block rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                  }
                >
                  Add Category
                </NavLink>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <button
              onClick={() =>
                setOpenMenu((prev) => ({ ...prev, products: !prev.products }))
              }
              className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
            >
              <span className="flex items-center gap-3">
                <Boxes size={18} />
                Products
              </span>
              <span>{openMenu.products ? "−" : "+"}</span>
            </button>

            {openMenu.products && (
              <div className="ml-9 mt-2 space-y-2 text-sm">
                <NavLink
                  to="/dashboard/products"
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-md bg-neutral-200 px-3 py-1 font-medium"
                      : "block rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                  }
                >
                  All Products
                </NavLink>

                <NavLink
                  to="/dashboard/products/add"
                  className={({ isActive }) =>
                    isActive
                      ? "block rounded-md bg-neutral-200 px-3 py-1 font-medium"
                      : "block rounded-md px-3 py-1 text-neutral-600 hover:bg-neutral-100"
                  }
                >
                  Add Product
                </NavLink>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="cursor-pointer flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
