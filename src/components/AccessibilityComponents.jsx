import { useId } from "react";

function AccessibilityComponent() {
  const nameId = useId();
  const emailId = useId();
  const errorId = useId();
  return (
    <>
      <form>
        <div>
          <label htmlFor={nameId}>Имя:</label>
          <input id={nameId} aria-describedby={errorId} type="text" />
        </div>

        <div>
          <label htmlFor={emailId}>Email:</label>
          <input id={emailId} aria-describedby={errorId} type="email" />
        </div>

        <p id={errorId} role="alert">
          Пожалуйста, заполните все поля
        </p>
      </form>
    </>
  );
}

export default AccessibilityComponent;
