import { useState, useEffect, useRef } from "react";

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(true);
  const recognitionRef = useRef(null);

  // Сбрасываем транскрипцию при остановке
  const resetTranscript = () => setTranscript("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasRecognitionSupport(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false; // Не продолжаем автоматически
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "ru-RU";

    recognitionRef.current.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(event.error);
      stopListening();
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        // Если запись активна, перезапускаем
        recognitionRef.current.start();
      }
    };

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isListening]);

  const startListening = async () => {
    setError(null);
    resetTranscript(); // Сбрасываем предыдущий текст

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      recognitionRef.current?.start();
    } catch (err) {
      console.error("Microphone access error:", err);
      setError("Microphone access denied");
      setIsListening(false);
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognitionRef.current?.stop();
    // Не сбрасываем транскрипцию здесь, чтобы сохранить последний результат
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error,
    hasRecognitionSupport,
  };
}