import { useRef, useState } from "react";

const CustomVideoPlayer = () => {
  const videoRef = useRef(null); // Создаем ref для видео
  const [isPlaying, setIsPlaying] = useState(false); // Состояние для воспроизведения

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play(); // Воспроизводим видео
      setIsPlaying(true);
    } else {
      videoRef.current.pause(); // Ставим видео на паузу
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    videoRef.current.volume = e.target.value; // Устанавливаем громкость
  };

  return (
    <div>
      <video ref={videoRef} width="400" controls>
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Ваш браузер не поддерживает видео.
      </video>
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="0.5"
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
