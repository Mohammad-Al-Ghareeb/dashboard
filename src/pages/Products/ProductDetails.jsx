// // import { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import toast, { Toaster } from "react-hot-toast";
// // import useCategoryStore from "../../store/categoryStore";
// // import useProductStore from "../../store/productStore";

// // export default function ProductDetails() {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { categories, fetchCategories } = useCategoryStore();
// //   const { fetchProductById, updateProduct, deleteProduct } = useProductStore();

// //   const [product, setProduct] = useState(null);
// //   const [form, setForm] = useState({
// //     name: "",
// //     price: "",
// //     categoryId: "",
// //     mainImageFile: null,
// //     mainImageUrl: "",
// //     attachedFiles: [],
// //     attachedUrls: [""],
// //   });
// //   const [loading, setLoading] = useState(false);

// //   const BASE_URL = "http://localhost:5000";

// //   // Helper to format image URL
// //   const getImageUrl = (img) => {
// //     if (!img) return null;
// //     return img.startsWith("http") ? img : `${BASE_URL}${img}`;
// //   };

// //   // Load categories
// //   useEffect(() => {
// //     fetchCategories();
// //   }, [fetchCategories]);

// //   // Load product
// //   useEffect(() => {
// //     const loadProduct = async () => {
// //       try {
// //         setLoading(true);
// //         const data = await fetchProductById(id);
// //         setProduct(data);
// //         setForm({
// //           name: data.name || "",
// //           price: data.price || "",
// //           categoryId: data.categoryId || "",
// //           mainImageFile: null,
// //           mainImageUrl: data.mainImage || "",
// //           attachedFiles: [],
// //           attachedUrls: data.attachedImages || [""],
// //         });
// //       } catch (err) {
// //         toast.error("Error fetching product: " + (err.message || err));
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     loadProduct();
// //   }, [id, fetchProductById]);

// //   if (!product) return <p className="text-neutral-500">Loading product...</p>;

// //   // Form handlers
// //   const handleChange = (e, index = null) => {
// //     const { name, value, files } = e.target;
// //     if (name === "mainImageFile") setForm({ ...form, mainImageFile: files[0] });
// //     else if (name === "attachedFiles")
// //       setForm({ ...form, attachedFiles: Array.from(files) });
// //     else if (name === "attachedUrls" && index !== null) {
// //       const newUrls = [...form.attachedUrls];
// //       newUrls[index] = value;
// //       setForm({ ...form, attachedUrls: newUrls });
// //     } else {
// //       setForm({ ...form, [name]: value });
// //     }
// //   };

// //   const addAttachedUrlField = () =>
// //     setForm({ ...form, attachedUrls: [...form.attachedUrls, ""] });
// //   const removeAttachedUrlField = (index) =>
// //     setForm({
// //       ...form,
// //       attachedUrls: form.attachedUrls.filter((_, i) => i !== index),
// //     });

// //   // Update product
// //   const handleUpdate = async (e) => {
// //     e.preventDefault();
// //     if (!form.name || !form.price)
// //       return toast.error("Name and price are required!");

// //     const formData = new FormData();
// //     formData.append("name", form.name);
// //     formData.append("price", form.price);
// //     formData.append("categoryId", form.categoryId);

// //     if (form.mainImageFile) formData.append("mainImage", form.mainImageFile);
// //     else formData.append("mainImageUrl", form.mainImageUrl);

// //     form.attachedFiles.forEach((file) =>
// //       formData.append("attachedImages", file)
// //     );
// //     form.attachedUrls.forEach(
// //       (url) => url.trim() && formData.append("attachedImagesUrls", url)
// //     );

// //     try {
// //       setLoading(true);
// //       await updateProduct(id, formData);
// //       toast.success("Product updated successfully!");
// //     } catch (err) {
// //       toast.error(
// //         "Error updating product: " +
// //           (err.response?.data?.message || err.message)
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Delete product
// //   const handleDelete = async () => {
// //     if (!window.confirm("Are you sure you want to delete this product?"))
// //       return;
// //     try {
// //       await deleteProduct(id);
// //       toast.success("Product deleted successfully!");
// //       navigate("/dashboard/products");
// //     } catch (err) {
// //       toast.error(
// //         "Error deleting product: " +
// //           (err.response?.data?.message || err.message)
// //       );
// //     }
// //   };

// //   return (
// //     <div className="mx-auto">
// //       <Toaster position="top-right" reverseOrder={false} />
// //       <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
// //         Product Details
// //       </h1>

// //       <form
// //         onSubmit={handleUpdate}
// //         className="rounded-2xl bg-white shadow p-6 space-y-5 max-w-[50rem]"
// //       >
// //         {/* Name */}
// //         <div>
// //           <label className="mb-1 block text-sm font-medium text-neutral-700">
// //             Product Name
// //           </label>
// //           <input
// //             type="text"
// //             name="name"
// //             value={form.name}
// //             onChange={handleChange}
// //             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
// //           />
// //         </div>

// //         {/* Price */}
// //         <div>
// //           <label className="mb-1 block text-sm font-medium text-neutral-700">
// //             Price
// //           </label>
// //           <input
// //             type="number"
// //             name="price"
// //             value={form.price}
// //             onChange={handleChange}
// //             step="0.01"
// //             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
// //           />
// //         </div>

// //         {/* Category */}
// //         <div>
// //           <label className="mb-1 block text-sm font-medium text-neutral-700">
// //             Category
// //           </label>
// //           <select
// //             name="categoryId"
// //             value={form.categoryId}
// //             onChange={handleChange}
// //             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
// //           >
// //             {categories.map((cat) => (
// //               <option key={cat._id} value={cat._id}>
// //                 {cat.name}
// //               </option>
// //             ))}
// //           </select>
// //         </div>

// //         {/* Main Image */}
// //         <div>
// //           <label className="mb-1 block text-sm font-medium text-neutral-700">
// //             Main Image
// //           </label>
// //           {form.mainImageUrl && (
// //             <img
// //               src={getImageUrl(form.mainImageUrl)}
// //               alt="Main"
// //               className="max-w-[20rem] h-40 object-cover rounded-xl mb-2"
// //             />
// //           )}
// //           <input
// //             type="file"
// //             name="mainImageFile"
// //             accept="image/*"
// //             onChange={handleChange}
// //             className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
// //           />
// //           <input
// //             type="text"
// //             name="mainImageUrl"
// //             value={form.mainImageUrl}
// //             onChange={handleChange}
// //             placeholder="Or enter main image URL"
// //             className="w-full mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
// //           />
// //         </div>

// //         {/* Attached Images */}
// //         <div>
// //           <label className="mb-1 block text-sm font-medium text-neutral-700">
// //             Attached Images
// //           </label>
// //           <div className="flex flex-wrap gap-2 mb-2">
// //             {form.attachedUrls.map(
// //               (url, idx) =>
// //                 url && (
// //                   <img
// //                     key={idx}
// //                     src={getImageUrl(url)}
// //                     alt={`Attached ${idx}`}
// //                     className="w-20 h-20 object-cover rounded-xl"
// //                   />
// //                 )
// //             )}
// //           </div>
// //           <input
// //             type="file"
// //             name="attachedFiles"
// //             multiple
// //             accept="image/*"
// //             onChange={handleChange}
// //             className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
// //           />

// //           {form.attachedUrls.map((url, idx) => (
// //             <div key={idx} className="flex gap-2 mb-2 mt-2">
// //               <input
// //                 type="text"
// //                 name="attachedUrls"
// //                 value={url}
// //                 onChange={(e) => handleChange(e, idx)}
// //                 placeholder="Enter attached image URL"
// //                 className="flex-1 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => removeAttachedUrlField(idx)}
// //                 className="rounded-xl bg-red-600 px-3 text-white hover:bg-red-500"
// //               >
// //                 X
// //               </button>
// //             </div>
// //           ))}
// //           <button
// //             type="button"
// //             onClick={addAttachedUrlField}
// //             className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 mt-2"
// //           >
// //             Add URL
// //           </button>
// //         </div>

// //         {/* Actions */}
// //         <div className="flex gap-2">
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
// //           >
// //             {loading ? "Updating..." : "Update Product"}
// //           </button>
// //           <button
// //             type="button"
// //             onClick={handleDelete}
// //             className="rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
// //           >
// //             Delete
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import useCategoryStore from "../../store/categoryStore";
// import useProductStore from "../../store/productStore";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { categories, fetchCategories } = useCategoryStore();
//   const { fetchProductById, updateProduct, deleteProduct } = useProductStore();

//   const [product, setProduct] = useState(null);
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

//   const BASE_URL = "http://localhost:5000";

//   // Format image URL (local or external)
//   const getImageUrl = (img) => {
//     if (!img) return null;
//     return img.startsWith("http") ? img : `${BASE_URL}${img}`;
//   };

//   // Load categories
//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   // Load product details
//   useEffect(() => {
//     const loadProduct = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchProductById(id);
//         setProduct(data);
//         setForm({
//           name: data.name || "",
//           price: data.price || "",
//           categoryId: data.categoryId || "",
//           mainImageFile: null,
//           mainImageUrl: data.mainImage || "",
//           attachedFiles: [],
//           attachedUrls: data.attachedImages?.length
//             ? data.attachedImages
//             : [""],
//         });
//       } catch (err) {
//         toast.error("Error fetching product: " + (err.message || err));
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProduct();
//   }, [id, fetchProductById]);

//   if (!product) return <p className="text-neutral-500">Loading product...</p>;

//   // Handle form input changes
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

//   // Add/remove attached URL fields
//   const addAttachedUrlField = () =>
//     setForm({ ...form, attachedUrls: [...form.attachedUrls, ""] });

//   const removeAttachedUrlField = (index) =>
//     setForm({
//       ...form,
//       attachedUrls: form.attachedUrls.filter((_, i) => i !== index),
//     });

//   // Update product
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!form.name || !form.price)
//       return toast.error("Name and price are required!");

//     const formData = new FormData();
//     formData.append("name", form.name);
//     formData.append("price", form.price);
//     formData.append("categoryId", form.categoryId);

//     // Main image
//     if (form.mainImageFile) {
//       formData.append("mainImage", form.mainImageFile);
//     } else {
//       formData.append("mainImageUrl", form.mainImageUrl);
//     }

//     // Multiple attached files
//     form.attachedFiles.forEach((file) => {
//       formData.append("attachedImages", file);
//     });

//     // Multiple attached URLs
//     form.attachedUrls.forEach((url) => {
//       if (url.trim()) formData.append("attachedImagesUrls", url);
//     });

//     try {
//       setLoading(true);
//       await updateProduct(id, formData);
//       toast.success("Product updated successfully!");
//     } catch (err) {
//       toast.error(
//         "Error updating product: " +
//           (err.response?.data?.message || err.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete product
//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;
//     try {
//       await deleteProduct(id);
//       toast.success("Product deleted successfully!");
//       navigate("/dashboard/products");
//     } catch (err) {
//       toast.error(
//         "Error deleting product: " +
//           (err.response?.data?.message || err.message)
//       );
//     }
//   };

//   return (
//     <div className="mx-auto">
//       <Toaster position="top-right" reverseOrder={false} />
//       <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
//         Product Details
//       </h1>

//       <form
//         onSubmit={handleUpdate}
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
//             step="0.01"
//             className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
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
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
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
//           {form.mainImageUrl && (
//             <img
//               src={getImageUrl(form.mainImageUrl)}
//               alt="Main"
//               className="max-w-[20rem] h-40 object-cover rounded-xl mb-2"
//             />
//           )}
//           <input
//             type="file"
//             name="mainImageFile"
//             accept="image/*"
//             onChange={handleChange}
//             className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
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
//           <div className="flex flex-wrap gap-2 mb-2">
//             {form.attachedUrls.map(
//               (url, idx) =>
//                 url && (
//                   <img
//                     key={idx}
//                     src={getImageUrl(url)}
//                     alt={`Attached ${idx}`}
//                     className="w-20 h-20 object-cover rounded-xl"
//                   />
//                 )
//             )}
//           </div>
//           <input
//             type="file"
//             name="attachedFiles"
//             multiple
//             accept="image/*"
//             onChange={handleChange}
//             className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
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

//         {/* Actions */}
//         <div className="flex gap-2">
//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
//           >
//             {loading ? "Updating..." : "Update Product"}
//           </button>
//           <button
//             type="button"
//             onClick={handleDelete}
//             className="rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
//           >
//             Delete
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useCategoryStore from "../../store/categoryStore";
import useProductStore from "../../store/productStore";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, fetchCategories } = useCategoryStore();
  const { fetchProductById, updateProduct, deleteProduct } = useProductStore();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    categoryId: "",
    mainImageFile: null,
    mainImageUrl: "",
    attachedFiles: [null], // multiple inputs for files
    attachedUrls: [""],
  });
  const [loading, setLoading] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // Helper to format image URL
  const getImageUrl = (img) => {
    if (!img) return null;
    return img.startsWith("http") ? img : `${BASE_URL}${img}`;
  };

  // Load categories
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Load product
  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
        setForm({
          name: data.name || "",
          price: data.price || "",
          categoryId: data.categoryId || "",
          mainImageFile: null,
          mainImageUrl: data.mainImage || "",
          attachedFiles: [null], // reset to one empty file input
          attachedUrls: data.attachedImages || [""],
        });
      } catch (err) {
        toast.error("Error fetching product: " + (err.message || err));
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id, fetchProductById]);

  if (!product) return <p className="text-neutral-500">Loading product...</p>;

  // Form handlers
  const handleChange = (e, index = null) => {
    const { name, value, files } = e.target;
    if (name === "mainImageFile") {
      setForm({ ...form, mainImageFile: files[0] });
    } else if (name === "mainImageUrl") {
      setForm({ ...form, mainImageUrl: value });
    } else if (name === "attachedUrls" && index !== null) {
      const newUrls = [...form.attachedUrls];
      newUrls[index] = value;
      setForm({ ...form, attachedUrls: newUrls });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // File input handlers (multiple)
  const handleFileChange = (e, index) => {
    const newFiles = [...form.attachedFiles];
    newFiles[index] = e.target.files[0] || null;
    setForm({ ...form, attachedFiles: newFiles });
  };

  const addFileInput = () =>
    setForm({ ...form, attachedFiles: [...form.attachedFiles, null] });

  const removeFileInput = (index) =>
    setForm({
      ...form,
      attachedFiles: form.attachedFiles.filter((_, i) => i !== index),
    });

  const addAttachedUrlField = () =>
    setForm({ ...form, attachedUrls: [...form.attachedUrls, ""] });
  const removeAttachedUrlField = (index) =>
    setForm({
      ...form,
      attachedUrls: form.attachedUrls.filter((_, i) => i !== index),
    });

  // Update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price)
      return toast.error("Name and price are required!");

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("categoryId", form.categoryId);

    if (form.mainImageFile) formData.append("mainImage", form.mainImageFile);
    else formData.append("mainImageUrl", form.mainImageUrl);

    form.attachedFiles.forEach((file) => {
      if (file) formData.append("attachedImages", file);
    });

    form.attachedUrls.forEach(
      (url) => url.trim() && formData.append("attachedImagesUrls", url)
    );

    try {
      setLoading(true);
      await updateProduct(id, formData);
      toast.success("Product updated successfully!");
    } catch (err) {
      toast.error(
        "Error updating product: " +
          (err.response?.data?.message || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully!");
      navigate("/dashboard/products");
    } catch (err) {
      toast.error(
        "Error deleting product: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        Product Details
      </h1>

      <form
        onSubmit={handleUpdate}
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
            step="0.01"
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
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
          {form.mainImageUrl && (
            <img
              src={getImageUrl(form.mainImageUrl)}
              alt="Main"
              className="max-w-[20rem] h-40 object-cover rounded-xl mb-2"
            />
          )}
          <input
            type="file"
            name="mainImageFile"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
          />
          <input
            type="text"
            name="mainImageUrl"
            value={form.mainImageUrl}
            onChange={handleChange}
            placeholder="Or enter main image URL"
            className="w-full mt-2 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm outline-none focus:border-neutral-400"
          />
        </div>

        {/* Attached Images */}
        <div>
          <label className="mb-1 block text-sm font-medium text-neutral-700">
            Attached Images
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {form.attachedUrls.map(
              (url, idx) =>
                url && (
                  <img
                    key={idx}
                    src={getImageUrl(url)}
                    alt={`Attached ${idx}`}
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                )
            )}
          </div>

          {/* Multiple file inputs */}
          {form.attachedFiles.map((file, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, idx)}
                className="flex-1 block text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-neutral-900 file:px-4 file:py-2 file:text-white hover:file:bg-neutral-800"
              />
              <button
                type="button"
                onClick={() => removeFileInput(idx)}
                className="rounded-xl bg-red-600 px-3 text-white hover:bg-red-500"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFileInput}
            className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800 mt-2"
          >
            Add File Input
          </button>

          {/* URL inputs */}
          {form.attachedUrls.map((url, idx) => (
            <div key={idx} className="flex gap-2 mb-2 mt-2">
              <input
                type="text"
                name="attachedUrls"
                value={url}
                onChange={(e) => handleChange(e, idx)}
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

        {/* Actions */}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-xl bg-neutral-900 px-4 py-3 text-sm font-medium text-white hover:bg-neutral-800 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
