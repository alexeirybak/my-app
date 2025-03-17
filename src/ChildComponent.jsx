import { memo } from "react";

const ChildComponent = memo(({ onAction }) => {
  console.log("Дочерний компонент отрендерен"); 

  return (
    <div>
      <h2>Дочерний компонент</h2>
      <button onClick={onAction}>Вызвать действие</button>
    </div>
  );
});

export default ChildComponent;
