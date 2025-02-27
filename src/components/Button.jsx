export function Button() {
  const handleClick = () => {
    alert("меня нажали");
  };
  return <button onClick={handleClick}>Кнопка</button>;
}
