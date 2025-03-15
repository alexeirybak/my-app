import { useRef } from "react";
import "./RefComponentEffect.css"; 

export function RefComponentEffect() {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="input-container">
      <input
        ref={inputRef}
        type="text"
        placeholder=" "
        className="floating-input"
      />
      <label className="floating-label">Введите текст</label>
      <button onClick={focusInput}>Ввести</button>
    </div>
  );
}
