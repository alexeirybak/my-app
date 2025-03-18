import { UserContext } from "./contexts/UserContext";

import Header from "./components/Header";

function App() {
  const user = {
    name: "Иван",
    email: "ivan@example.com",
  };

  return (
    <UserContext.Provider value={user}>
      <Header />
    </UserContext.Provider>
  );
}

export default App;
