import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { PlayerContext } from "../contexts/PlayerContext";
import UserInfo from "./UserInfo";

function Header() {
  const { user, updateUser } = useContext(UserContext);
  const player = useContext(PlayerContext);
  console.log(player);

  return (
    <div>
      <h1>Добро пожаловать, {user.name}!</h1>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Пауза" : "Играть"}
      </button>
      <button
        onClick={() => updateUser({ name: "Вася", email: "vasya@example.com" })}
      >
        Сменить пользователя
      </button>

      <UserInfo />
    </div>
  );
}

export default Header;
