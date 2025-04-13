import { Link } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h2>Аутентификация</h2>
      <div>
        <Link to={"/auth/login"}>Вход</Link>
        <Link to={"/auth/register"}>Регистрация</Link>
      </div>
    </div>
  );
};

export default AuthLayout;
