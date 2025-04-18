import { Link } from "react-router";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h2>Аутентификация</h2>
      <div>
        <Link to="login">Вход</Link>
        <Link to="register">Регистрация</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
