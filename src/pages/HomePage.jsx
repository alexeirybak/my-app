import { Button } from "../components/Button";
import { UserList } from "../components/UserList";
import TextComponent from "../components/TextComponent";
import { TaskList } from "../components/TaskList";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-page">
      <h2>Домашняя страница</h2>
      <p>Добро пожаловать на наш сайт!</p>
      <Button />
      <UserList />
      <TextComponent />
      <TaskList />
    </div>
  );
}

export default HomePage;
