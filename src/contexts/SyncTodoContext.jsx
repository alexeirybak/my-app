import { createContext, useContext, useEffect, useState } from "react";

export const SyncTodoContext = createContext(null);

export const SyncTodoProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState([]);

  //Слушатель изменения состояния сети
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  return (
    <SyncTodoContext.Provider value={{ isOnline, setIsOnline, pendingSync, setPendingSync }}>
      {children}
    </SyncTodoContext.Provider>
  );
};

export const useSyncTodoContext = () => useContext(SyncTodoContext);
