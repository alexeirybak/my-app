import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import SearchItemWithTransition from "./components/SearchItemWithTransition";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SearchItemWithTransition />
  </StrictMode>
);
