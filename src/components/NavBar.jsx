import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const StyledLink = styled(Link)`
  color: blue;
  text-decoration: none;
  margin-right: 30px;

  &:hover {
    color: darkblue;
    text-decoration: underline;
  }
`;

const Navbar = () => {
  const isAuth = true;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth && location.pathname.startsWith("/about")) {
      navigate("/auth");
    }
  }, [isAuth, location.pathname, navigate]);

  return (
    <nav style={{ backgroundColor: "gray" }}>
      <StyledLink to="/">Главная</StyledLink>
      <StyledLink to="/about">О нас</StyledLink>
      <StyledLink to="/contacts">Контакты</StyledLink>
      <StyledLink to="/auth">Войти</StyledLink>
    </nav>
  );
};

export default Navbar;
