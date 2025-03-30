import { useId } from "react";

function App() {
  const id = useId();
  const emailId = `${useId()}-email`;
  return (
    <>
      <label htmlFor={emailId}>Введите email</label>
      <input type="email" id={emailId} />

      <label>
        <p>Согласен с условиями пользования</p>
        <input type="checkbox" />
      </label>
      <br />
      <label htmlFor={id}>Введите пароль</label>
      {/*Какой-то код */}
      <input type="password" id={id} />
    </>
  );
}

export default App;
