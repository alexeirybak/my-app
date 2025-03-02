export function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => {
        const discountedPrice = product.price * 0.9; // Скидка 10%
        return (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>Цена: ${discountedPrice.toFixed(2)}</p>
          </li>
        );
      })}
    </ul>
  );
}
