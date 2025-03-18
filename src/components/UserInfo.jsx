import { useContext } from "react";
import { PlayerContext } from "../contexts/PlayerContext";
import UserDetails from "./UserDetails";

function UserInfo() {
  const player = useContext(PlayerContext);

  return (
    <div>
      <h2>Информация о пользователе</h2>
      <button onClick={player.togglePlay}>
        {player.isPlaying ? "Пауза" : "Играть"}
      </button>
      <UserDetails />
    </div>
  );
}

export default UserInfo;
