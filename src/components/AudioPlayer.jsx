import React, { useRef, useEffect, useImperativeHandle } from "react";

const AudioPlayer = ({ ref, src, onEnd }) => {
  const audioRef = useRef(null); // Референция на аудиоэлемент

  // Отслеживаем событие окончания воспроизведения
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("ended", onEnd); // Добавляем обработчик
      return () => {
        audioElement.removeEventListener("ended", onEnd); // Убираем обработчик при размонтировании
      };
    }
  }, [onEnd]);

  // Раскрываем методы через useImperativeHandle
  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    },
    seekForward: () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime; // Текущее время воспроизведения
        audioRef.current.currentTime = currentTime + 30; // Перематываем на 30 секунд вперед
      }
    },
    seekBack: () => {
      if (audioRef.current) {
        const currentTime = audioRef.current.currentTime; // Текущее время воспроизведения
        audioRef.current.currentTime = currentTime - 30; // Перематываем на 30 секунд назад
      }
    },
  }));

  return (
    <div>
      <audio ref={audioRef} src={src} controls>
        Ваш браузер не поддерживает аудиоэлемент.
      </audio>
    </div>
  );
};

export default AudioPlayer;
