import { useState, useEffect, useRef } from "react";

export function useSpeechRecognition() {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [hasRecognitionSupport, setHasRecognitionSupport] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasRecognitionSupport(false);
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false; // Останавливается после паузы
    recognitionRef.current.interimResults = true; // Промежуточные результаты
    recognitionRef.current.lang = "ru-RU";

    recognitionRef.current.onresult = (event) => {
      // Если запись остановлена, игнорируем новые результаты
      if (!isListening) return;

      const newTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(newTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setError(event.error);
      setIsListening(false);
    };

    recognitionRef.current.onend = () => {
      // Перезапускаем только если запись активна
      if (isListening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [isListening]);

  const startListening = async () => {
    setError(null);
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
    setTranscript(""); // Очищаем текст
    recognitionRef.current?.stop();
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    error,
    hasRecognitionSupport,
  };
}
