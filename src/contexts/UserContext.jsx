import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function useUserContext() {
  const user = useContext(UserContext);

  if (!user) {
    throw new Error("Данные пользователя не были получены");
  }

  return user;
}
