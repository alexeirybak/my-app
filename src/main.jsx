import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { RefComponents } from "./RefComponent";
import { RefComponentEffect } from "./RefComponentEffect";
import NumberTracker from "./NumberTracker";
import UserComponent from "./UserComponent";
import CustomVideoPlayer from "./CustomVideoPlayer";
import AdvancedAudioPlayer from "./AdvancedAudioPlayer";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    {/* <RefComponents /> */}
    {/* <RefComponentEffect /> */}
    {/* <NumberTracker /> */}
    {/* <UserComponent /> */}
    <CustomVideoPlayer />
    {/* <AdvancedAudioPlayer /> */}
  </StrictMode>
);
