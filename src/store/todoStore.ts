import {
  action,
  autorun,
  computed,
  configure,
  makeObservable,
  observable,
  reaction,
  runInAction,
  trace,
  when,
} from "mobx";
configure({ enforceActions: "always" });
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

class TodoStore {
  todos: Todo[] = [];
  filter: Filter = "all";
  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      todos: observable,
      filter: observable,
      loading: observable,
      error: observable,
      addTodo: action,
      toggleTodo: action,
      removeTodo: action,
      setFilter: action,
      loadTodos: action,
      filteredTodos: computed,
      completedCount: computed,
      activeCount: computed,
      progress: computed,
    });
    //makeAutoObservable(this);

    autorun(() => {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    });

    reaction(
      () => this.todos.length,
      (length) => {
        console.log(
          `Всего задач: ${length} (Выполнено: ${this.completedCount})`,
        );
      },
    );

    reaction(
      () => this.filter,
      (filter, previousFilter) => {
        console.log(`Фильтр изменился: ${previousFilter} -> ${filter} `);

        if (filter === "done") {
          console.log("Пользователь смотрит выполненные задачи");
        }
      },
    );

    when(
      () => this.completedCount === 5,
      () => {
        alert("Поздравляю! Вы выполнили 5 задач");
        console.log("Поздравляю! Вы выполнили 5 задач");
      },
    );
  }

  addTodo(title: string) {
    this.todos.push({
      id: Date.now(),
      title,
      done: false,
    });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }

  setFilter(filter: Filter) {
    this.filter = filter;
  }

  get filteredTodos() {
    trace();
    if (this.filter === "active") {
      return this.todos.filter((t) => !t.done);
    }
    if (this.filter === "done") {
      return this.todos.filter((t) => t.done);
    }

    return this.todos;
  }

  get completedCount() {
    return this.todos.filter((t) => t.done).length;
  }

  get activeCount() {
    return this.todos.filter((t) => !t.done).length;
  }

  get progress() {
    if (this.todos.length === 0) return 0;
    return (this.completedCount / this.todos.length) * 100;
  }

  async loadTodos() {
    this.loading = true;
    this.error = null;
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=5",
      );

      const data: ApiTodo[] = await res.json();

      runInAction(() => {
        this.todos = data.map((todo) => ({
          id: todo.id,
          title: todo.title,
          done: todo.completed,
        }));
      });
    } catch (error) {
      runInAction(() => {
        this.error = String(error);
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const todoStore = new TodoStore();
