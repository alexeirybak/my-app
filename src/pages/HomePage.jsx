import { Link } from "react-router";

const HomePage = () => {
  return (
    <div>
      <h1>Главная страница</h1>
      <Link to="/about" state={{ breadcrumbInfo: "Нашей компании 10 лет!" }}>
        О нас
      </Link>
      <br />
      <Link to={"/auth"}>Войти</Link>
    </div>
  );
};

export default HomePage;
