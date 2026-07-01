import { createMachine, assign, fromPromise } from "xstate";
import { fetchTodos, Todo } from "../api/todos";

interface TodoContext {
  todos: Todo[];
  error: string | null;
  maxTodos: number;
  uiError: string | null;
}

export const todosMachine = createMachine({
  id: "todos",
  initial: "idle",
  context: {
    todos: [],
    error: null,
    maxTodos: 5,
    uiError: null,
  } as TodoContext,

  states: {
    idle: {
      on: {
        FETCH: "loading",
      },
    },
    loading: {
      invoke: {
        id: "fetchTodos",
        src: fromPromise(() => fetchTodos()),
        onDone: {
          target: "ready",
          actions: assign({
            todos: ({ event }) => event.output,
            uiError: () => null,
            error: () => null,
          }),
        },
        onError: {
          target: "error",
          actions: assign({
            error: ({ event }) => {
              const error = event.error;
              if (error && typeof error === "object" && "message" in error) {
                return String(error.message);
              }
              if (error === "string") {
                return error;
              }
              return "Произошла неизвестная ошибка при загрузке данных";
            },
            uiError: () => null,
          }),
        },
      },
    },

    ready: {
      after: {
        5000: {
          actions: assign({
            uiError: () => null,
          }),
        },
      },
      on: {
        ADD: [
          {
            target: "ready",
            reenter: true,
            guard: ({ context }) => context.todos.length >= context.maxTodos,
            actions: assign({
              uiError: () => "Достигнуто максимальное количество задач",
            }),
          },
          {
            target: "ready",
            reenter: true,
            guard: ({ event }) => event.todo.text.trim().length === 0,
            actions: assign({
              uiError: () => "Задача не может быть пустой",
            }),
          },
          {
            target: "ready",
            reenter: true,
            guard: ({ context, event }) =>
              context.todos.some(
                (todo) =>
                  todo.text.trim().toLowerCase() ===
                  event.todo.text.trim().toLowerCase(),
              ),
            actions: assign({
              uiError: () => "Задача с таким текстом уже существует",
            }),
          },
          {
            actions: assign({
              todos: ({ context, event }) => [
                ...context.todos,
                { ...event.todo, text: event.todo.text.trim() },
              ],
              uiError: () => null,
            }),
          },
        ],

        DELETE: {
          target: "ready",
          actions: assign({
            todos: ({ context, event }) => {
              if (event.type === "DELETE") {
                return context.todos.filter((todo) => todo.id !== event.id);
              }
              return context.todos;
            },
            uiError: () => null,
          }),
        },

        CLEAR_UI_ERROR: {
          target: "ready",
          actions: assign({
            uiError: () => null,
          }),
        },
      },
    },

    error: {
      on: {
        RETRY: "loading",
      },
    },
  },
});
