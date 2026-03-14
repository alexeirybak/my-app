import ProductList from "./components/ProductList";
import { useAppDispatch, useAppSelector } from "./hooks";
import { login, logout } from "./features/user/userSlice";
import "./index.css";
import "./App.css";
import Modal from "./components/Modal";
import { useThemeStore } from "./zustand/themeStore";

export const App = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.items);
  const user = useAppSelector((state) => state.user);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className={`app ${theme}`}>
      <header className="header">
        <h1>Redux + Zustand</h1>
        <div className="headerRight">
          <button className="btn btn-outline" onClick={toggleTheme}>
            {theme === "light" ? "Темная" : "Светлая"}
          </button>
          {user.isLogged ? (
            <div className="usePanel">
              <p>Привет {user.name}</p>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(logout())}
              >
                Выйти
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => dispatch(login("Алексей"))}
            >
              Войти
            </button>
          )}
        </div>
      </header>
      <main>
        <ProductList />
        <div>Количество товаров в корзине: {cart.length}</div>
      </main>
      <Modal />
    </div>
  );
};
