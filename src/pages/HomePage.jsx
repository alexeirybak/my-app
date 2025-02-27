import { Button } from "../components/Button";
import { UserList } from "../components/UserList";
import programmer from "../assets/programmer.jpg";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <h2>Домашняя страница</h2>
      <p>Добро пожаловать на наш сайт!</p>
      <Button />
      <UserList />
      <img src={programmer} alt="Программист" />
      <img src="images/laptop.jpg" alt="Ноутбук" />
    </div>
  );
}

export default HomePage;
