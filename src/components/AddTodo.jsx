import { useState, useEffect, useRef, useCallback } from "react";
import DeadlineBlock from "./DeadlineBlock";
import PlusIcon from "./PlusIcon";
import microphoneIcon from "../assets/microphone.png";

export function AddTodo({ onAdd }) {
  const [text, setText] = useState("");
  const [deadline, setDeadline] = useState("");
  const [showDeadlineInput, setShowDeadlineInput] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const accumulatedTextRef = useRef("");
  const finalTextRef = useRef("");

  const startListening = () => {
    if (recognition) {
      accumulatedTextRef.current = text;
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
      setText(finalTextRef.current);
    }
  }, [recognition]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = true;
        recognitionInstance.interimResults = true;
        recognitionInstance.lang = "ru-RU";

        recognitionInstance.onresult = (event) => {
          let interimTranscript = "";
          let finalTranscript = "";

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            if (!accumulatedTextRef.current.includes(finalTranscript.trim())) {
              accumulatedTextRef.current += " " + finalTranscript;
              finalTextRef.current = accumulatedTextRef.current;
              setText(accumulatedTextRef.current);
            }
          } else if (interimTranscript) {
            setText(accumulatedTextRef.current + " " + interimTranscript);
          }
        };

        recognitionInstance.onerror = (event) => {
          console.error("Ошибка распознавания:", event.error);
          stopListening();
        };

        recognitionInstance.onend = () => {
          if (isListening) {
            recognitionInstance.start();
          }
        };

        setRecognition(recognitionInstance);
      }
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const textToAdd = text.trim();
    if (textToAdd) {
      onAdd(textToAdd, deadline);
      setText("");
      setDeadline("");
      setShowDeadlineInput(false);
      accumulatedTextRef.current = "";
      finalTextRef.current = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            accumulatedTextRef.current = e.target.value;
            finalTextRef.current = e.target.value;
          }}
          placeholder="Добавить задачу..."
          className="flex-1 p-3 text-gray-700 dark:bg-page-dark dark:text-txt-dark outline-none placeholder-gray-400"
        />
        <button
          type="button"
          onClick={toggleListening}
          className={` cursor-pointer p-3 ${
            isListening ? "bg-red-500" : "bg-gray-200"
          } hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center`}
          title={isListening ? "Остановить запись" : "Начать запись голоса"}
        >
          <img
            src={microphoneIcon}
            alt="Микрофон"
            className={`w-6 h-6 ${
              isListening ? "filter brightness-0 invert" : ""
            }`}
          />
        </button>
        <button
          type="submit"
          className={`p-3 ${
            isListening
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-btn-light hover:bg-btn-light-hv cursor-pointer"
          } text-white dark:bg-btn-dark hover:dark:bg-btn-dark-hv transition-colors duration-300`}
          disabled={isListening}
          title={
            isListening
              ? "Завершите голосовой ввод перед добавлением"
              : "Добавить задачу"
          }
        >
          <PlusIcon />
        </button>
      </div>

      <DeadlineBlock
        showDeadlineInput={showDeadlineInput}
        deadline={deadline}
        setDeadline={setDeadline}
        setShowDeadlineInput={setShowDeadlineInput}
      />

      {isListening && (
        <div className="mt-2 text-sm text-blue-500 flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
          <span>Идет запись... Нажмите микрофон для остановки</span>
        </div>
      )}
    </form>
  );
}
