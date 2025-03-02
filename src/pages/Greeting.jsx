// export function Greeting({ isLoggedIn }) {
//   if (isLoggedIn) {
//     return <h1>Добро пожаловать!</h1>;
//   } else {
//     return <h1>Пожалуйста, войдите в систему!</h1>;
//   }
// }

export function Greeting({ isLoggedIn }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Добро пожаловать!</h1>
      ) : (
        <h1>Пожалуйста, войдите в систему!</h1>
      )}
    </div>
  );
}
