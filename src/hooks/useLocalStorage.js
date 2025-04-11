import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const useLocalStorage = () => {
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (todos) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  };

  return {loadFromLocalStorage, saveToLocalStorage}
};
