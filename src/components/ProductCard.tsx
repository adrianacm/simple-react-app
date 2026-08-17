import type { Product } from "../types/Product";

interface ProductProps {
  product: Product;
}

function ProductCard({ product }: ProductProps) {
  return (
    <>
      <div className="card">
        <div className="card-header d-flex justify-content-between bg-light">
          {product.category}
        </div>
        <div>
          <img
            src={product.image}
            className="card-img-top img-fluid"
            alt="Product Image"
            style={{ height: "200px", objectFit: "cover" }}
          />
        </div>

        <div className="card-body" key={product.id}>
          <h5 className="card-title">{product.name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">£ {product.price}</span>
            <div>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-fill text-warning"></i>
              <i className="bi bi-star-half text-warning"></i>
              <small className="text-muted"> Rating: ({product.rating})</small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
