import "./MyName.css";

export function MyName() {
  const cats = ["Лев", "Тигр", "Пума"];
  return (
    <ul style={{ color: "blue", fontSize: 32, backgroundColor: "green" }}>
      {cats.map((cat) => (
        <li key={cat}>{cat}</li>
      ))}
    </ul>
  );
}
