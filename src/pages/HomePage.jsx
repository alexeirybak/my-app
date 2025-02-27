import { Button } from "../components/Button";
import "./HomePage.css";

function HomePage({click}) {


  const showMessage = (message) => {
    alert(message);
  };

  return (
    <div className="home-page">
      <h2>Домашняя страница</h2>
      <p>Добро пожаловать на наш сайт!</p>
      <Button
        label="Нажми меня"
        onClick={click}
      />
      <Button
        label="Какое-то сообщение"
        onClick={() => showMessage("Привет!")}
      />
    </div>
  );
}

export default HomePage;
