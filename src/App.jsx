import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./pages/AuthLayout";
import LoginPage from "./pages/LoginPage";
import RegPage from "./pages/RegPage";

export const AppRoutes = {
  HOME: "/",
  ABOUT: "/about",
  AUTH: "/auth",
  LOGIN: "login",
  REG: "register",
  NOT_FOUND: "*",
};

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path={AppRoutes.ABOUT} element={<AboutPage />} />
      <Route path={AppRoutes.AUTH} element={<AuthLayout />} />

      <Route
        path={`${AppRoutes.AUTH}/${AppRoutes.LOGIN}`}
        element={<LoginPage />}
      />
      <Route path="/auth/register" element={<RegPage />} />

      <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
