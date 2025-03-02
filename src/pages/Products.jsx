import { ProductList } from "./ProductList";

export function Products() {
  const products = [
    { id: 1, name: "Ноутбук", price: 1000 },
    { id: 2, name: "Смартфон", price: 500 },
    { id: 3, name: "Планшет", price: 700 },
  ];

  return (
    <div>
      <ProductList products={products} />
    </div>
  );
}
