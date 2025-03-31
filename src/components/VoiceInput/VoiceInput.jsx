import { useEffect } from "react";
import { useSpeechRecognition } from "../../hooks/useSpeechRecognition";
import * as S from "./VoiceInput.styles";

export function VoiceInput({ onResult }) {
  const {
    transcript,
    isListening,
    error,
    startListening,
    stopListening,
    resetTranscript,
    hasRecognitionSupport,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onResult(transcript);
    }
  }, [transcript, onResult]);

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript(); // Сбрасываем перед новым стартом
      startListening();
    }
  };

  if (!hasRecognitionSupport) {
    return null;
  }

  return (
    <S.VoiceInputContainer>
      <S.VoiceButton
        type="button"
        onClick={handleToggleListening}
        $isListening={isListening}
        aria-label={isListening ? "Остановить запись" : "Начать запись"}
      >
        {isListening ? "🛑" : "🎤"}
      </S.VoiceButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </S.VoiceInputContainer>
  );
}
