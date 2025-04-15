import Home from "./pages/Home";
import { Routes, Route } from "react-router";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/user/:userId" element={<UserPage />} />
    </Routes>
  );
}

export default App;
