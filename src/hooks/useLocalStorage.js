import { LOCAL_STORAGE_KEY } from "../constants/todos";

export const useLocalStorage = () => {
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return {loadFromLocalStorage, saveToLocalStorage}
};
