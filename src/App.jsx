import { ProductList } from "./ProductList";

function App() {
  const products = [];

  for (let i = 0; i < 1000; i++) {
    products.push({
      id: i + 1,
      name: `Продукт ${i + 1}`,
    });
  }
  return (
    <>
      <ProductList products={products} />
    </>
  );
}

export default App;



