import { Link } from "react-router";

const LoginPage = () => {
  return (
    <div>
      <h3>Форма входа</h3>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button>Войти</button>
      </form>
      <p>
        Нет аккаунта?{""}
        <Link to="/auth/register">Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default LoginPage;
