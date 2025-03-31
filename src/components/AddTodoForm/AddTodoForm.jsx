import { useState, useRef } from "react";
import { VoiceInput } from "../VoiceInput/VoiceInput";
import * as S from "./AddTodoForm.styles";

export function AddTodoForm({ onAddTodo }) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text);
      setText("");
    }
  };

  const handleVoiceResult = (transcript) => {
    setText(transcript);
    inputRef.current.focus();
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.TextInput
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Добавить новую задачу..."
        ref={inputRef}
      />
      <S.AddButton type="submit">Добавить</S.AddButton>
      <VoiceInput onResult={handleVoiceResult} />
    </S.Form>
  );
}
