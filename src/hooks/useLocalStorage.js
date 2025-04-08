export const useLocalStorage = () => {
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  const saveToLocalStorage = (key, todos) => {
    localStorage.setItem(key, JSON.stringify(todos));
  };

  return {loadFromLocalStorage, saveToLocalStorage}
};

