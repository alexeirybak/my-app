import Counter from "./components/Counter";
import CounterChanger from "./components/CounterChanger";
import CounterUser from "./components/CounterUser";

function App() {
  return (
    <>
      <div className="text-5xl">
        <Counter />
        <CounterUser />
        <CounterChanger />
      </div>
    </>
  );
}

export default App;
