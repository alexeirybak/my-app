export type Todo = {
  id: number;
  text: string;
};

export const fetchTodos = (): Promise<Todo[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "Изучить XState" },
        { id: 2, text: "Сделать TODO на XState" },
      ]);
    }, 3000);
  });
};

// export const fetchTodos = (): Promise<Todo[]> => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject(new Error("Произошла ошибка при загрузке данных"));
//     }, 3000);
//   });
// };