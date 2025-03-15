import { useRef, useState, useEffect } from "react";

const AdvancedAudioPlayer = () => {
  const audioRef = useRef(null); // Ref для аудиоэлемента
  const [isPlaying, setIsPlaying] = useState(false); // Состояние воспроизведения
  const [currentTime, setCurrentTime] = useState(0); // Текущее время трека
  const [duration, setDuration] = useState(0); // Длительность трека
  const [volume, setVolume] = useState(0.5); // Громкость (от 0 до 1)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // Индекс текущего трека

  const tracks = [
    {
      title: "Track 1",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      title: "Track 2",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "Track 3",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
  ];

  // Обработчик воспроизведения/паузы
  const handlePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Обработчик изменения громкости
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  // Обработчик изменения времени трека
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    if (!isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  // Обработчик перемотки
  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Переход к следующему треку
  const handleNextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
  };

  // Воспроизведение следующего трека при завершении текущего
  useEffect(() => {
    const audioElement = audioRef.current;

    const handleEnded = () => {
      handleNextTrack();
    };

    if (audioElement) {
      audioElement.addEventListener("ended", handleEnded);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleEnded);
      }
    };
  }, [currentTrackIndex]);

  // Обновление источника аудио при смене трека
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrackIndex].src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  // Форматирование времени (минуты:секунды)
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00"; // Проверка на NaN
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h2>{tracks[currentTrackIndex].title}</h2>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      >
        <source src={tracks[currentTrackIndex].src} type="audio/mpeg" />
        Ваш браузер не поддерживает аудио.
      </audio>
      <div>
        <button onClick={handlePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNextTrack}>Next Track</button>
      </div>
      <div>
        <input
          type="range"
          min="0"
          max={isNaN(duration) ? 0 : duration} // Проверка на NaN
          value={currentTime}
          onChange={handleSeek}
        />
        <span>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>
      <div>
        <span>Громкость: </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AdvancedAudioPlayer;
