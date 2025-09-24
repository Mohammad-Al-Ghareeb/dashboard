// // src/pages/Categories/AddCategory.jsx
// import { useState } from "react";
// import useCategoryStore from "../../store/categoryStore";
// import { useNavigate } from "react-router-dom";

// export default function AddCategory() {
//   const { addCategory } = useCategoryStore();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     imageFile: null,
//     imageUrl: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "imageFile") {
//       setForm({ ...form, imageFile: files[0] });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name) return alert("Name is required!");

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("description", form.description);

//     if (form.imageFile) {
//       formData.append("image", form.imageFile); // file upload
//     } else if (form.imageUrl) {
//       formData.append("imageUrl", form.imageUrl); // URL
//     }

//     try {
//       setLoading(true);
//       await addCategory(formData);
//       navigate("/dashboard/categories");
//     } catch (err) {
//       alert("Error adding category: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto">
//       <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
//         Add Category
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="rounded-2xl bg-white shadow p-6 space-y-5 max-w-[50rem]"
//       >
//         {/* Name */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Category Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter category name"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Enter description"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//             rows={3}
//           ></textarea>
//         </div>

//         {/* Image Upload */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             name="imageFile"
//             accept="image/*"
//             onChange={handleChange}
//             className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
//           />
//         </div>

//         {/* OR Image URL */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Image URL
//           </label>
//           <input
//             type="text"
//             name="imageUrl"
//             value={form.imageUrl}
//             onChange={handleChange}
//             placeholder="https://example.com/image.jpg"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//           />
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
//         >
//           {loading ? "Adding..." : "Add Category"}
//         </button>
//       </form>
//     </div>
//   );
// }

// src/pages/Categories/AddCategory.jsx
import { useState } from "react";
import useCategoryStore from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddCategory() {
  const { addCategory } = useCategoryStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null,
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageFile") {
      setForm({ ...form, imageFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return toast.error("Category name is required!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);

    if (form.imageFile) {
      formData.append("image", form.imageFile); // file upload
    } else if (form.imageUrl) {
      formData.append("imageUrl", form.imageUrl); // URL
    }

    try {
      setLoading(true);
      await addCategory(formData);
      toast.success("Category added successfully!");
      navigate("/dashboard/categories");
    } catch (err) {
      toast.error("Error adding category: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        Add Category
      </h1>

      <form
        onSubmit={handleSubmit}
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
            placeholder="Enter category name"
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
            placeholder="Enter description"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
            rows={3}
          ></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Upload Image
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

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
}
