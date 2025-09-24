import { useEffect } from "react";
import useCategoryStore from "../../store/categoryStore";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/constants";

export default function AllCategories() {
  const { categories, loading, error, fetchCategories } = useCategoryStore();
  console.log(categories);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const navigate = useNavigate();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-800">
        All Categories
      </h1>

      {loading && <p className="text-neutral-500">Loading categories...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-2xl bg-white shadow p-5 transition hover:shadow-md"
            onClick={() => {
              navigate(`/dashboard/categories/${cat._id}`);
            }}
          >
            <div className="mb-3 h-32 w-full overflow-hidden rounded-xl bg-neutral-100 flex items-center justify-center">
              {cat.image ? (
                <img
                  src={
                    cat.image.startsWith("http")
                      ? cat.image
                      : `${IMAGE_BASE_URL}${cat.image}`
                  }
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-neutral-400 text-sm">No Image</span>
              )}
            </div>
            <h2 className="text-lg font-medium text-neutral-800">{cat.name}</h2>
            {cat.description && (
              <p className="mt-1 text-sm text-neutral-500 line-clamp-2">
                {cat.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
