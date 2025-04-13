import { Link } from "react-router";

const RegPage = () => {
  return (
    <div>
      <h3>Форма регистрации</h3>
      <form>
        <input type="text" placeholder="Имя" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Пароль" />
        <button>Войти</button>
      </form>
      <p>
        Уже есть аккаунт?{""}
        <Link to="/auth/login">Войдите</Link>
      </p>
    </div>
  );
};

export default RegPage;
