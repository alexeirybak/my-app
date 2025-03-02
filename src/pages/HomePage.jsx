//import { Greeting } from "./Greeting";
//import { Notification } from "./Notification";
//import { UserProfile } from "./UserProfile";
//import { TodoList } from "./TodoList";
import { WelcomeMessage } from "./WelcomeMessage";
import "./HomePage.css";

function HomePage() {
  // const messages = ["Сообщение 1", "Сообщение 2"];
  // const user = {
  //   name: "Иван",
  //   age: 25,
  // };

  // const todos = [
  //   { id: 1, text: "Изучить React", completed: true },
  //   { id: 2, text: "Создать проект", completed: false },
  // ];

  const isLoggedIn = true;

  return (
    <>
      {/* <Greeting isLoggedIn={true} />
      <Greeting isLoggedIn={false} /> */}
      {/* <Notification messages={messages} />
      <Notification messages={[]} /> */}
      {/* <UserProfile user={user} />
      <UserProfile user={null} /> */}
      {/* <TodoList todos={todos} /> */}
      <WelcomeMessage isLoggedIn={isLoggedIn} />
    </>
  );
}

export default HomePage;
