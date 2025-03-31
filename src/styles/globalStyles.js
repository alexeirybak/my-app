import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#ffffff",
  text: "#333333",
  primary: "#4caf50",
  secondary: "#f5f5f5",
  border: "#e0e0e0",
  danger: "#f44336",
};

export const darkTheme = {
  body: "#1a1a1a",
  text: "#f5f5f5",
  primary: "#66bb6a",
  secondary: "#2d2d2d",
  border: "#444444",
  danger: "#e57373",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.3s ease;
  }
`;
