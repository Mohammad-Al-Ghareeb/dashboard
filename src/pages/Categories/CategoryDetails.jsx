// src/pages/Categories/CategoryDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCategoryStore from "../../store/categoryStore";
import toast, { Toaster } from "react-hot-toast";

export default function CategoryDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, updateCategory, deleteCategory } = useCategoryStore();

  const [category, setCategory] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  // Load category data
  useEffect(() => {
    const cat = categories.find((c) => c._id.toString() === id.toString());
    if (cat) {
      setCategory(cat);
      setForm({
        name: cat.name || "",
        description: cat.description || "",
        imageFile: null,
        imageUrl: cat.image || "",
      });
    }
  }, [id, categories]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Name is required!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (form.imageFile) formData.append("image", form.imageFile);
    else if (form.imageUrl) formData.append("imageUrl", form.imageUrl);

    try {
      setLoading(true);
      await updateCategory(id, formData);
      toast.success("Category updated successfully!");
    } catch (err) {
      toast.error("Error updating category: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
    try {
      setLoading(true);
      await deleteCategory(id);
      toast.success("Category deleted successfully!");
      navigate("/dashboard/categories");
    } catch (err) {
      toast.error("Error deleting category: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!category) return <p className="text-neutral-500">Loading...</p>;

  return (
    <div className="mx-auto">
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        Category Details
      </h1>

      <form
        onSubmit={handleUpdate}
        className="rounded-2xl bg-white shadow p-6 space-y-5 max-w-[50rem]"
      >
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
            rows={3}
          ></textarea>
        </div>

        {/* Current Image */}
        {category.image && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-neutral-700">
              Current Image
            </label>
            <img
              src={
                category.image.startsWith("http")
                  ? category.image
                  : `http://localhost:5000${category.image}`
              }
              alt={category.name}
              className="h-40 max-w-[40rem] object-cover rounded-xl border border-neutral-200"
            />
          </div>
        )}
        {/* Upload New Image */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Upload New Image
          </label>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
          />
        </div>

        {/* OR Image URL */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-500 transition disabled:opacity-50"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
