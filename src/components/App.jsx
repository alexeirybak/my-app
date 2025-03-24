import { useRef } from "react";
import Input from "./Input";
import Page from "./Page";
import ParentComponent from "./ParentComponent";

const App = () => {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.fn1();
  };

  const handleGetValue = () => {
    const value = inputRef.current.fn2();
    console.log(value);
  };

  return (
    <>
      <div>
        <Input ref={inputRef} />
        <button onClick={handleFocus}>Фокус на input</button>
        <button onClick={handleGetValue}>Получить значение</button>
      </div>
      <p>---------------------</p>
      <Page />
      <p>---------------------</p>
      <ParentComponent />
    </>
  );
};

export default App;
