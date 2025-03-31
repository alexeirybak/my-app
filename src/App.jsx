import { useEffect } from "react";
import { useTodos } from "./hooks/useTodos";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { DragDropProvider } from "./hooks/useDragAndDrop";
import { TodoContext } from "./contexts/TodoContext";
import { TodoList } from "./components/TodoList/TodoList";
import { AddTodoForm } from "./components/AddTodoForm/AddTodoForm";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, lightTheme, darkTheme } from "./styles/globalStyles";
import * as S from "./App.styles";

export default function App() {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const todoMethods = useTodos(storedTodos);

  useEffect(() => {
    setStoredTodos(todoMethods.todos);
  }, [todoMethods.todos, setStoredTodos]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <TodoContext.Provider value={{ ...todoMethods, theme, toggleTheme }}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <DragDropProvider>
          <S.AppContainer>
            <S.Header>
              <S.Title>Todo App</S.Title>
              <S.ThemeToggle onClick={toggleTheme}>
                {theme === "light" ? "🌙" : "☀️"}
              </S.ThemeToggle>
            </S.Header>
            <AddTodoForm onAddTodo={todoMethods.addTodo} />
            <S.Filters>
              <S.FilterButton
                $active={todoMethods.filter === "all"}
                onClick={() => todoMethods.setFilter("all")}
              >
                Все ({todoMethods.todosCount})
              </S.FilterButton>
              <S.FilterButton
                $active={todoMethods.filter === "active"}
                onClick={() => todoMethods.setFilter("active")}
              >
                Активные ({todoMethods.todosCount - todoMethods.completedCount})
              </S.FilterButton>
              <S.FilterButton
                $active={todoMethods.filter === "completed"}
                onClick={() => todoMethods.setFilter("completed")}
              >
                Завершенные ({todoMethods.completedCount})
              </S.FilterButton>
              {todoMethods.completedCount > 0 && (
                <S.ClearButton onClick={todoMethods.clearCompleted}>
                  Очистить завершенные
                </S.ClearButton>
              )}
            </S.Filters>
            <TodoList
              todos={todoMethods.filteredTodos}
              onToggle={todoMethods.toggleTodo}
              onDelete={todoMethods.deleteTodo}
              onUpdate={todoMethods.updateTodo}
            />
          </S.AppContainer>
        </DragDropProvider>
      </ThemeProvider>
    </TodoContext.Provider>
  );
}
