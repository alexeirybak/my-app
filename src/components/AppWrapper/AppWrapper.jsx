import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ThemeProvider } from "./contexts/ThemeContext";
import App from "./App";

export default function AppWrapper() {
  return (
    <ThemeProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ThemeProvider>
  );
}
