import type { ReactNode } from "react";

interface ProductsLayoutProps {
  children: ReactNode;
}

function ListProducts({ children }: ProductsLayoutProps) {
  return (
    <div className="container p-4">
      <div className="row g-4">{children}</div>
    </div>
  );
}

export default ListProducts;
