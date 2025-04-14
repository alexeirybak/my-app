import { NavLink } from "react-router";
import "./Nav.css";
import styles from "./styles.module.css";

const NavbarWithNavLink = () => {
  return (
    <nav>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: isActive ? "green" : "blue",
          marginRight: 30,
        })}
      >
        Главная
      </NavLink>
      <NavLink
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? "red" : "blue",
          marginRight: 30,
        })}
      >
        О нас
      </NavLink>
      <NavLink to="/auth">
        {({ isActive }) => (
          <span className={isActive ? "active" : ""}>
            {isActive ? "👉" : ""} Войти
          </span>
        )}
      </NavLink>
      <NavLink to="/" className={({ isActive }) => (isActive ? "nav-nav" : "")}>
        На главную
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-green-500" : "text-amber-700"
        }
      >
        О нас
      </NavLink>

      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? styles.link : "")}
      >
        О нас
      </NavLink>
    </nav>
  );
};

export default NavbarWithNavLink;
