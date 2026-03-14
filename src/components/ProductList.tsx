import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useFilterStore } from "../zustand/filterStore";
import { useUIStore } from "../zustand/uiStore";

const ProductList = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.items);
  const category = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);
  const openModal = useUIStore((state) => state.openModal);

  const filteredProducts = products.filter((p) => {
    if (category === "all") return true;
    return p.category === category;
  });

  return (
    <div className="products">
      <div className="productsHeader">
        <h2>Товары</h2>
        <select
          className="select"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="electronics">Электроника</option>
          <option value="clothing">Одежда</option>
          <option value="books">Книги</option>
          <option value="toys">Игрушки</option>
        </select>
      </div>
      <div className="productGrid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="productCard">
            <h3>{product.name}</h3>
            <div className="productActions">
              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(product))}
              >
                Добавить
              </button>
              <button className="btn btn-outline" onClick={openModal}>
                Информация
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
