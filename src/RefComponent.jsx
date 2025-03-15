import { useRef } from "react";

export function RefComponents() {
  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      console.log(inputRef);
      console.log(inputRef.current);
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Фокус на поле ввода</button>
    </div>
  );
}
