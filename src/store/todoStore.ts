import {
  action,
  autorun,
  computed,
  makeAutoObservable,
  makeObservable,
  observable,
  reaction,
  runInAction,
  trace,
  when,
} from "mobx";

export type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type ApiTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "done";

function createTodoStore() {
  const store = {
    todos: [] as Todo[],
    filter: "all" as Filter,
    loading: false,
    error: null as string | null,

    addTodo: action((title: string) => {
      store.todos.push({
        id: Date.now(),
        title,
        done: false,
      });
    }),

    toggleTodo: action((id: number) => {
      const todo = store.todos.find((t) => t.id === id);
      if (todo) {
        todo.done = !todo.done;
      }
    }),

    removeTodo: action((id: number) => {
      store.todos = store.todos.filter((t) => t.id !== id);
    }),

    setFilter: action((filter: Filter) => {
      store.filter = filter;
    }),

    loadTodos: action(async () => {
      store.loading = true;
      store.error = null;
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=5",
        );

        const data: ApiTodo[] = await res.json();

        runInAction(() => {
          store.todos = data.map((todo) => ({
            id: todo.id,
            title: todo.title,
            done: todo.completed,
          }));
        });
      } catch (error) {
        runInAction(() => {
          store.error = String(error);
        });
      } finally {
        runInAction(() => {
          store.loading = false;
        });
      }
    }),

    get filteredTodos() {
      trace();
      if (store.filter === "active") {
        return store.todos.filter((t) => !t.done);
      }
      if (store.filter === "done") {
        return store.todos.filter((t) => t.done);
      }

      return store.todos;
    },

    get completedCount() {
      return store.todos.filter((t) => t.done).length;
    },

    get activeCount() {
      return store.todos.filter((t) => !t.done).length;
    },

    get progress() {
      if (store.todos.length === 0) return 0;
      return (store.completedCount / store.todos.length) * 100;
    },
  };

  makeAutoObservable(store);

  autorun(() => {
    localStorage.setItem("todos", JSON.stringify(store.todos));
  });

  reaction(
    () => store.todos.length,
    (length) => {
      console.log(
        `Всего задач: ${length} (Выполнено: ${store.completedCount})`,
      );
    },
  );

  reaction(
    () => store.filter,
    (filter, previousFilter) => {
      console.log(`Фильтр изменился: ${previousFilter} -> ${filter} `);

      if (filter === "done") {
        console.log("Пользователь смотрит выполненные задачи");
      }
    },
  );

  when(
    () => store.completedCount === 5,
    () => {
      alert("Поздравляю! Вы выполнили 5 задач");
      console.log("Поздравляю! Вы выполнили 5 задач");
    },
  );

  return store;
}

export const todoStore = createTodoStore();
export type TodoStore = ReturnType<typeof createTodoStore>;
