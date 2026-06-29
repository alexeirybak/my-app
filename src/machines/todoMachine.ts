import { createMachine, assign, fromPromise } from 'xstate';
import type { Todo } from '../api/todos';
import { fetchTodos } from '../api/todos';
 
interface TodoContext {
  todos: Todo[];
  error: string | null;
  maxTodos: number;
  uiError: string | null; // Добавляем поле для UI ошибок
}
 
type TodoEvent = 
  | { type: 'FETCH' }
  | { type: 'RETRY' }
  | { type: 'ADD'; todo: Todo }
  | { type: 'DELETE'; id: number }
  | { type: 'CLEAR_UI_ERROR' }; // Событие для очистки ошибки
 
export const todosMachine = createMachine({
  id: 'todos',
  initial: 'idle',
  context: {
    todos: [],
    error: null,
    maxTodos: 10,
    uiError: null, // Инициализируем UI ошибку
  } as TodoContext,
  types: {} as {
    context: TodoContext;
    events: TodoEvent;
  },
  states: {
    idle: {
      on: { 
        FETCH: 'loading' 
      }
    },
    loading: {
      invoke: {
        id: 'fetchTodos',
        src: fromPromise(() => fetchTodos()),
        onDone: {
          target: 'ready',
          actions: assign({
            todos: ({ event }) => event.output,
            uiError: () => null // Очищаем ошибку при успешной загрузке
          })
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => {
              const error = event.error;
              if (error && typeof error === 'object' && 'message' in error) {
                return String(error.message);
              }
              if (typeof error === 'string') {
                return error;
              }
              return 'Произошла ошибка при загрузке';
            },
            uiError: () => null // Очищаем UI ошибку
          })
        }
      }
    },
    ready: {
      on: {
        ADD: [
          // Первый guard: проверка лимита
          {
            target: 'ready',
            guard: ({ context, event }) => {
              if (event.type === 'ADD') {
                return context.todos.length >= context.maxTodos;
              }
              return false;
            },
            actions: assign({
              uiError: () => `Достигнут лимит задач (максимум ${10})` // Устанавливаем ошибку
            })
          },
          // Второй guard: проверка на пустой текст
          {
            target: 'ready',
            guard: ({ event }) => {
              if (event.type === 'ADD') {
                return event.todo.text.trim().length === 0;
              }
              return false;
            },
            actions: assign({
              uiError: () => 'Текст задачи не может быть пустым' // Устанавливаем ошибку
            })
          },
          // Третий guard: проверка на дубликат
          {
            target: 'ready',
            guard: ({ context, event }) => {
              if (event.type === 'ADD') {
                return context.todos.some(todo => 
                  todo.text.toLowerCase() === event.todo.text.toLowerCase()
                );
              }
              return false;
            },
            actions: assign({
              uiError: () => 'Такая задача уже существует' // Устанавливаем ошибку
            })
          },
          // Если все проверки пройдены - добавляем задачу
          {
            target: 'ready',
            guard: ({ context, event }) => {
              if (event.type === 'ADD') {
                return event.todo.text.trim().length > 0 &&
                       context.todos.length < context.maxTodos &&
                       !context.todos.some(todo => 
                         todo.text.toLowerCase() === event.todo.text.toLowerCase()
                       );
              }
              return false;
            },
            actions: assign({
              todos: ({ context, event }) => {
                if (event.type === 'ADD') {
                  return [...context.todos, event.todo];
                }
                return context.todos;
              },
              uiError: () => null // Очищаем ошибку при успешном добавлении
            })
          }
        ],
        DELETE: {
          target: 'ready',
          guard: ({ context, event }) => {
            if (event.type === 'DELETE') {
              const exists = context.todos.some(todo => todo.id === event.id);
              if (!exists) {
                // Если тудушка не найдена - показываем ошибку
                return false;
              }
              return true;
            }
            return false;
          },
          actions: [
            assign({
              todos: ({ context, event }) => {
                if (event.type === 'DELETE') {
                  return context.todos.filter(todo => todo.id !== event.id);
                }
                return context.todos;
              },
              uiError: () => null // Очищаем ошибку при успешном удалении
            })
          ]
        },
        CLEAR_UI_ERROR: {
          target: 'ready',
          actions: assign({
            uiError: () => null // Очищаем ошибку по запросу
          })
        }
      }
    },
    error: {
      on: {
        RETRY: 'loading'
      }
    }
  }
});