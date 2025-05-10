import Notification from "./Notification";
import NetworkProvider from "../providers/NetworkProvider";
import { FaSun, FaMoon } from "react-icons/fa";

const ToggleTheme = ({ toggleTheme, theme }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        <button
          className="relative cursor-pointer"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Темная тема" : "Светлая тема"}
        >
          <div className="w-14 h-7 rounded-full shadow-inner transition-colors duration-300 bg-gray-300 dark:bg-btn-dark"></div>
          <div className="text-sm absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 translate-x-0 dark:translate-x-7 flex items-center justify-center">
            {theme === "light" ? (
              <FaSun className="text-yellow-500 " />
            ) : (
              <FaMoon className="text-blue-700" />
            )}
          </div>
        </button>
      </div>
      <NetworkProvider>
        <Notification />
      </NetworkProvider>
    </div>
  );
};

export default ToggleTheme;
