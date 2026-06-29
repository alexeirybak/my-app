export type Todo = {
  id: number;
  text: string;
};
 
export const fetchTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Изучить XState' },
        { id: 2, text: 'Сделать TODO на XState' },
      ]);
    }, 3000);
  });
};