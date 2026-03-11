import { UserProfile } from "./components/UserProfile";
import { UserStats } from "./components/UserStats";
import { UserActions } from "./components/UserActions";
import "./index.css";

export const App = () => {
  return (
    <div className="app">
      <h1>Prop Drilling Проблема</h1>
      <p>Состояние передается через пропсы вниз по дереву</p>

      <UserProfile />
      <UserStats />
      <UserActions />
    </div>
  );
};
