import { UserProvider } from "./contexts/UserContext";
import { PlayerProvider } from "./contexts/PlayerContext";
import Header from "./components/Header";

function App() {
  return (
    <UserProvider>
      <PlayerProvider>
        <Header />
      </PlayerProvider>
    </UserProvider>
  );
}

export default App;
