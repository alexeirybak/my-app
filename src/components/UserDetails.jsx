import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../contexts/UserContext";
import { PlayerContext } from "../contexts/PlayerContext";

function UserDetails() {
  const { user } = useContext(UserContext);
  const player = useContext(PlayerContext);

  const audioRef = useRef(null);

  // Используем useEffect для управления воспроизведением
  useEffect(() => {
    if (audioRef.current) {
      if (player.isPlaying) {
        audioRef.current.play(); // Воспроизводим аудио
      } else {
        audioRef.current.pause(); // Ставим на паузу
      }
    }
  }, [player.isPlaying]); // Зависимость: player.isPlaying

  return (
    <>
      <div>
        <h3>Детали пользователя:</h3>
        <p>Имя: {user.name}</p>
        <p>Email: {user.email}</p>
      </div>

      <div>
        <h4>Плеер</h4>
        <p>Состояние: {player.isPlaying ? "Играет" : "На паузе"}</p>
        <audio
          ref={audioRef} // Привязываем ссылку к аудиоэлементу
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          controls
        />
      </div>
    </>
  );
}

export default UserDetails;
