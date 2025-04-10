import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SyncTodoProvider } from "./contexts/SyncTodoContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SyncTodoProvider>
      <App />
    </SyncTodoProvider>
  </StrictMode>
);
