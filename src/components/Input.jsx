import { useRef, useImperativeHandle } from "react";

const Input = ({ ref }) => {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        fn1: () => {
          inputRef.current.focus();
        },
        fn2: () => inputRef.current.value,
      };
    },
    []
  );

  return <input ref={inputRef} type="text" placeholder="Введите текст" />;
};

export default Input;
