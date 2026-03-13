import { UserProfile } from "./components/UserProfile";
import { UserStats } from "./components/UserStats";
import { UserActions } from "./components/UserActions";
import { useUserActions } from "./store/useUserStoreThird";
import "./index.css";
import { useEffect } from "react";

export const App = () => {
  // const { fetchRandomUser } = useUserActions();
  // useEffect(() => {
  //   fetchRandomUser();
  // }, [fetchRandomUser]);
  return (
    <div className="app">
      <UserProfile />
      <UserStats />
      <UserActions />
    </div>
  );
};
