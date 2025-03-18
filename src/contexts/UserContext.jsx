import { createContext, useState } from "react";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Иван",
    email: "ivan@example.com",
  });

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return <UserContext.Provider value={{user, updateUser}}>{children}</UserContext.Provider>;
}
