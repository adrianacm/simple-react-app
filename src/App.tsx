import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import ProductFilters from "./components/ProductFilters";
import ListProducts from "./layouts/ListProducts";
import type { Product } from "./types/Product";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const categories = [...new Set(products.map((product) => product.category))];

  useEffect(() => {
    async function fetchProducts() {
      try {
        // Delay to see the loading state
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch("/products.json");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await response.json();

        setProducts(data);
      } catch (error) {
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "" || product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((productA, productB) => {
      switch (sort) {
        case "name-asc":
          return productA.name.localeCompare(productB.name);

        case "name-desc":
          return productB.name.localeCompare(productA.name);

        case "price-asc":
          return productA.price - productB.price;

        case "price-desc":
          return productB.price - productA.price;

        case "rating-asc":
          return productA.rating - productB.rating;

        case "rating-desc":
          return productB.rating - productA.rating;

        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <ListProducts>
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-2">Loading products...</p>
        </div>
      </ListProducts>
    );
  }

  if (error) {
    return (
      <ListProducts>
        <div className="alert alert-danger d-flex justify-content-center">
          {error}
        </div>
      </ListProducts>
    );
  }

  return (
    <div className="container">
      <h2 className="my-5 d-flex justify-content-center">
        Products ({filteredProducts.length})
      </h2>

      <ListProducts>
        <ProductFilters
          search={search}
          category={category}
          sort={sort}
          categories={categories}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onSortChange={setSort}
        />

        {filteredProducts.map((product) => (
          <div className="col-12 col-md-6 col-lg-4">
            <ProductCard key={product.id} product={product} />
          </div>
        ))}
      </ListProducts>

      {filteredProducts.length === 0 && (
        <p className="d-flex justify-content-center">No products found.</p>
      )}
    </div>
  );
}

export default App;
