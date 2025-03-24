import React, { useRef, useState } from "react";
import AudioPlayer from "./AudioPlayer";

function ParentComponent() {
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); // Состояние воспроизведения

  const handlePlay = () => {
    audioPlayerRef.current.play(); // Вызываем метод play из дочернего компонента
    setIsPlaying(true); // Устанавливаем состояние воспроизведения в true
  };

  const handlePause = () => {
    audioPlayerRef.current.pause(); // Вызываем метод pause из дочернего компонента
    setIsPlaying(false); // Устанавливаем состояние воспроизведения в false
  };

  const handleSeekForward = () => {
    audioPlayerRef.current.seekForward(); // Перематываем на 30 секунд вперед
  };

  const handleSeekBack = () => {
    audioPlayerRef.current.seekBack(); // Перематываем на 30 секунд назад
  };

  const handleEnd = () => {
    setIsPlaying(false); // Устанавливаем состояние воспроизведения в false
  };

  return (
    <div
      style={{
        margin: "0 auto",
        padding: "20px",
        // Условное добавление фонового изображения
        background: isPlaying
          ? "url('./eq.gif') center/cover no-repeat"
          : "#121212",
        minHeight: "300px", // Минимальная высота для видимости фона
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      <h1
        style={{
          color: "#eee",
        }}
      >
        Аудиоплеер
      </h1>
      <AudioPlayer
        ref={audioPlayerRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
        onEnd={handleEnd}
      />
      <button
        onClick={handlePlay}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Играть
      </button>
      <button
        onClick={handlePause}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Пауза
      </button>
      <button
        onClick={handleSeekForward}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Вперед на 30 сек
      </button>
      <button
        onClick={handleSeekBack}
        style={{
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Назад на 30 сек
      </button>
    </div>
  );
}

export default ParentComponent;
