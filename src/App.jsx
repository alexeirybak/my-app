import { useState, lazy, Suspense } from "react";

const TextComponent = lazy(() => import("./components/TextComponent"));
const TodoComponent = lazy(() => import("./components/TodoComponent"));

function App() {
  const [showText, setShowText] = useState(false);
  const [showTodo, setShowTodo] = useState(false);

  return (
    <div>
      <div>
        <h2>1. Загрузка компонента</h2>
        <button
          onClick={() => {
            setShowText(!showText);
          }}
        >
          <Suspense fallback={<div>Компонент загружается</div>}>
            {showText ? "Скрыть" : "Показать"} компонент
          </Suspense>
        </button>

        {showText && <TextComponent />}

        <h2>2. Загрузка компонента списка задач</h2>
        <button
          onClick={() => {
            setShowTodo(!showTodo);
          }}
        >
          {showTodo ? "Скрыть" : "Показать"} список задач
        </button>
        <Suspense fallback={<div>Компонент загружается</div>}>
          {showTodo && <TodoComponent />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
