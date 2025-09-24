// // src/pages/Products/AddProduct.jsx
// import { useState, useEffect } from "react";
// import useProductStore from "../../store/productStore";
// import useCategoryStore from "../../store/categoryStore";
// import { useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";

// export default function AddProduct() {
//   const { addProduct } = useProductStore();
//   const { categories, fetchCategories } = useCategoryStore();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     categoryId: "",
//     mainImageFile: null,
//     mainImageUrl: "",
//     attachedFiles: [],
//     attachedUrls: [""],
//   });

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   const handleChange = (e, index = null) => {
//     const { name, value, files } = e.target;

//     if (name === "mainImageFile") {
//       setForm({ ...form, mainImageFile: files[0] });
//     } else if (name === "attachedFiles") {
//       setForm({ ...form, attachedFiles: Array.from(files) });
//     } else if (name === "attachedUrls" && index !== null) {
//       const newUrls = [...form.attachedUrls];
//       newUrls[index] = value;
//       setForm({ ...form, attachedUrls: newUrls });
//     } else {
//       setForm({ ...form, [name]: value });
//     }
//   };

//   const addAttachedUrlField = () =>
//     setForm({ ...form, attachedUrls: [...form.attachedUrls, ""] });

//   const removeAttachedUrlField = (index) => {
//     const newUrls = form.attachedUrls.filter((_, i) => i !== index);
//     setForm({ ...form, attachedUrls: newUrls });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.price || !form.categoryId)
//       return toast.error("Name, price, and category are required!");

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("price", form.price);
//     formData.append("categoryId", form.categoryId);

//     // Main Image
//     if (form.mainImageFile) formData.append("mainImage", form.mainImageFile);
//     else if (form.mainImageUrl)
//       formData.append("mainImageUrl", form.mainImageUrl);

//     // Attached Images
//     form.attachedFiles.forEach((file) =>
//       formData.append("attachedImages", file)
//     );
//     form.attachedUrls.forEach((url) => {
//       if (url.trim()) formData.append("attachedImagesUrls", url);
//     });

//     try {
//       setLoading(true);
//       await addProduct(formData);
//       toast.success("Product added successfully!");
//       navigate("/dashboard/products");
//     } catch (err) {
//       toast.error("Error adding product: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className=" mx-auto">
//       <Toaster position="top-right" reverseOrder={false} />
//       <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
//         Add Product
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="rounded-2xl bg-white shadow p-6 space-y-5 max-w-[50rem]"
//       >
//         {/* Name */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Product Name
//           </label>
//           <input
//             type="text"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter product name"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//           />
//         </div>

//         {/* Price */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Price
//           </label>
//           <input
//             type="number"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Enter price"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//             step="0.01"
//           />
//         </div>

//         {/* Category */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Category
//           </label>
//           <select
//             name="categoryId"
//             value={form.categoryId}
//             onChange={handleChange}
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//           >
//             <option value="">Select a category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Main Image */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Main Image
//           </label>
//           <input
//             type="file"
//             name="mainImageFile"
//             accept="image/*"
//             onChange={handleChange}
//             className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
//           />
//           <input
//             type="text"
//             name="mainImageUrl"
//             value={form.mainImageUrl}
//             onChange={handleChange}
//             placeholder="Or enter main image URL"
//             className="w-full mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//           />
//         </div>

//         {/* Attached Images */}
//         <div>
//           <label className="mb-1 block text-sm font-medium text-neutral-700">
//             Attached Images
//           </label>
//           <input
//             type="file"
//             name="attachedFiles"
//             accept="image/*"
//             multiple
//             onChange={handleChange}
//             className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
//           />
//           {form.attachedUrls.map((url, idx) => (
//             <div key={idx} className="flex gap-2 mb-2 mt-2">
//               <input
//                 type="text"
//                 name="attachedUrls"
//                 value={url}
//                 onChange={(e) => handleChange(e, idx)}
//                 placeholder="Enter attached image URL"
//                 className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
//               />
//               <button
//                 type="button"
//                 onClick={() => removeAttachedUrlField(idx)}
//                 className="rounded-xl bg-red-600 px-3 text-white hover:bg-red-500"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addAttachedUrlField}
//             className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 mt-2"
//           >
//             Add URL
//           </button>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
//         >
//           {loading ? "Adding..." : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// }
// src/pages/Products/AddProduct.jsx
import { useState, useEffect } from "react";
import useProductStore from "../../store/productStore";
import useCategoryStore from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function AddProduct() {
  const { addProduct } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    mainImageFile: null,
    mainImageUrl: "",
    attachedFiles: [],
    attachedUrls: [""],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Handle form changes
  const handleChange = (e, index = null, type = "attachedUrls") => {
    const { name, value, files } = e.target;

    if (name === "mainImageFile") setForm({ ...form, mainImageFile: files[0] });
    else if (type === "attachedFiles" && index !== null) {
      const newFiles = [...form.attachedFiles];
      newFiles[index] = files[0];
      setForm({ ...form, attachedFiles: newFiles });
    } else if (type === "attachedUrls" && index !== null) {
      const newUrls = [...form.attachedUrls];
      newUrls[index] = value;
      setForm({ ...form, attachedUrls: newUrls });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add/Remove attached files or URLs
  const addAttachedFileField = () =>
    setForm({ ...form, attachedFiles: [...form.attachedFiles, null] });
  const removeAttachedFileField = (index) => {
    const newFiles = form.attachedFiles.filter((_, i) => i !== index);
    setForm({ ...form, attachedFiles: newFiles });
  };

  const addAttachedUrlField = () =>
    setForm({ ...form, attachedUrls: [...form.attachedUrls, ""] });
  const removeAttachedUrlField = (index) => {
    const newUrls = form.attachedUrls.filter((_, i) => i !== index);
    setForm({ ...form, attachedUrls: newUrls });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.categoryId) {
      return toast.error("Name, price, and category are required!");
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("categoryId", form.categoryId);

    if (form.mainImageFile) formData.append("mainImage", form.mainImageFile);
    else if (form.mainImageUrl)
      formData.append("mainImageUrl", form.mainImageUrl);

    form.attachedFiles.forEach((file) => {
      if (file) formData.append("attachedImages", file);
    });
    form.attachedUrls.forEach((url) => {
      if (url.trim()) formData.append("attachedImagesUrls", url);
    });

    try {
      setLoading(true);
      await addProduct(formData);
      toast.success("Product added successfully!");
      navigate("/dashboard/products");
    } catch (err) {
      toast.error("Error adding product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto ">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white shadow p-6 space-y-5 max-w-[50rem]"
      >
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
            step="0.01"
          />
        </div>

        {/* Category */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Category
          </label>
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Main Image */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Main Image
          </label>
          <input
            type="file"
            name="mainImageFile"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800 mb-2"
          />
          <input
            type="text"
            name="mainImageUrl"
            value={form.mainImageUrl}
            onChange={handleChange}
            placeholder="Or enter main image URL"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Attached Files */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Attached Files
          </label>
          {form.attachedFiles.map((file, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="file"
                name="attachedFiles"
                onChange={(e) => handleChange(e, idx, "attachedFiles")}
                className="flex-1 block w-full text-sm text-neutral-600 file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
              />
              <button
                type="button"
                onClick={() => removeAttachedFileField(idx)}
                className="rounded-xl bg-red-600 px-3 text-white hover:bg-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAttachedFileField}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 mt-2"
          >
            Add File
          </button>
        </div>

        {/* Attached URLs */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Attached URLs
          </label>
          {form.attachedUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2 mb-2 mt-2">
              <input
                type="text"
                name="attachedUrls"
                value={url}
                onChange={(e) => handleChange(e, idx, "attachedUrls")}
                placeholder="Enter attached image URL"
                className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
              />
              <button
                type="button"
                onClick={() => removeAttachedUrlField(idx)}
                className="rounded-xl bg-red-600 px-3 text-white hover:bg-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addAttachedUrlField}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 mt-2"
          >
            Add URL
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
