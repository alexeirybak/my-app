import { useState, useMemo } from "react";
import { ProductItem } from "./ProductItem";
export const ProductList = ({ products }) => {
  const [filteredList, setFilteredList] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  const filteredProducts = useMemo(() => {
    console.time("filter");
    const result = products.filter((product) =>
      product.name.toLowerCase().includes(filteredList.toLowerCase())
    );
    console.timeEnd("filter");
    return result;
  }, [products, filteredList]);

  return (
    <div>
      <input
        type="text"
        value={filteredList}
        onChange={(e) => setFilteredList(e.target.value)}
        placeholder="Поиск..."
      />
      <button onClick={() => setRenderCount(renderCount + 1)}>
        Рендерить - {renderCount}
      </button>
      <ul>
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product.name} />
        ))}
      </ul>
    </div>
  );
};
