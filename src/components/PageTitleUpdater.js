import { useLocation } from "react-router";
import { useEffect } from "react";

const PageTitleUpdater = () => {
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const pageTitles = {
      "/": "Главная",
      "/about": "О компании",
      "/contacts": "Контакты",
      "/auth": "Аутентификация",
      "/auth/login": "Вход",
      "/auth/register": "Регистрация",
    };
    document.title = pageTitles[location.pathname] || "Мое приложение";
  }, [location]);

  return null;
};

export default PageTitleUpdater;
