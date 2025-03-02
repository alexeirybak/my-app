export function Notification({ messages }) {
  return (
    <div>
      {messages.length > 0 && <h1>У Вас {messages.length} новых сообщений</h1>}
    </div>
  );
}
