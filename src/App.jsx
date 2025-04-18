import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage.jsx";
import Contacts from "./pages/Contacts";
import AuthLayout from "./pages/AuthLayout.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegPage from "./pages/RegPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/NavBar.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import PageTitleUpdater from "./components/PageTitleUpdater.js";
import LargePage from "./components/LargePage.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <PageTitleUpdater />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contacts" element={<Contacts />} />

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <LargePage />
    </>
  );
}

export default App;
