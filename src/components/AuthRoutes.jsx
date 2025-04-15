import { Route } from "react-router";
import AuthLayout from "../pages/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegPage from "../pages/RegPage";

const AuthRoutes = () => (
  <Route path="auth" element={<AuthLayout />}>
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegPage />} />
  </Route>
);

export default AuthRoutes;
