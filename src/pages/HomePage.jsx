import "./HomePage.css";

function HomePage({ clicks, setClicks }) {
  const handleClick = () => {
    setClicks((x) => x + 1);
    setClicks((prev) => prev + 1);
    setClicks((prev) => prev + 1);
  };
  return (
    <>
      <button onClick={handleClick}>Нажми меня</button>
      <p>Счет: {clicks}</p>
    </>
  );
}

export default HomePage;
