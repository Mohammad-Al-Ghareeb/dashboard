// // src/pages/Products/AllProducts.jsx
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useProductStore from "../../store/productStore";

// export default function AllProducts() {
//   const { products, loading, error, fetchProducts } = useProductStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProducts(); // fetch from real API
//   }, [fetchProducts]);

//   return (
//     <div>
//       <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
//         All Products
//       </h1>

//       {loading && <p className="text-neutral-500">Loading products...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="rounded-2xl bg-white shadow p-5 transition hover:shadow-md cursor-pointer"
//             onClick={() => navigate(`/dashboard/products/${product.id}`)}
//           >
//             <div className="mb-3 h-40 w-full overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center">
//               {product.image ? (
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-full w-full object-cover"
//                 />
//               ) : (
//                 <span className="text-neutral-400 text-sm">No Image</span>
//               )}
//             </div>

//             <h2 className="text-lg font-medium text-neutral-800">
//               {product.name}
//             </h2>
//             {product.description && (
//               <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
//                 {product.description}
//               </p>
//             )}
//             <p className="mt-2 text-sm font-semibold text-neutral-900">
//               ${product.price}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../store/productStore";
import { IMAGE_BASE_URL } from "../../utils/constants";

export default function AllProducts() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const navigate = useNavigate();
  console.log(products);

  useEffect(() => {
    fetchProducts(); // fetch from real API
  }, [fetchProducts]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        All Products
      </h1>

      {loading && <p className="text-neutral-500">Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="rounded-2xl bg-white shadow p-5 transition hover:shadow-md cursor-pointer"
            onClick={() => navigate(`/dashboard/products/${product._id}`)}
          >
            <div className="mb-3 h-40 w-full overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center">
              {product.mainImage ? (
                <img
                  src={
                    product.mainImage.startsWith("http")
                      ? product.mainImage
                      : `${IMAGE_BASE_URL}${product.mainImage}`
                  }
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-neutral-400 text-sm">No Image</span>
              )}
            </div>

            <h2 className="text-lg font-medium text-neutral-800">
              {product.name}
            </h2>
            {product.description && (
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                {product.description}
              </p>
            )}
            <p className="mt-2 text-sm font-semibold text-neutral-900">
              ${product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
