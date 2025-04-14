import { useEffect, useState } from "react";
import { AppRoutes } from "../App";
import { Link, useNavigate } from "react-router";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!email) navigate("/");
  // }, [email]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      console.log("Авторизация успешна");
      navigate("/about", { replace: true });
    } else {
      alert("Заполните все поля");
    }
  };

  return (
    <div>
      <h3>Форма входа</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
        />
        <button type="submit">Войти</button>
      </form>
      <p>
        Нет аккаунта?{""}
        <Link to={`${AppRoutes.AUTH}/${AppRoutes.REG}`}>Зарегистрируйтесь</Link>
      </p>
    </div>
  );
};

export default LoginPage;
