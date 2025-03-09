import { createGlobalStyle } from "styled-components";

// export const GlobalStyles = createGlobalStyle`
//   body {
//     margin: 0;
//     padding: 0;
//     font-family: Arial, sans-serif;
//   }

//   h1, h2, h3 {
//     color: darkblue;
//   }
// `;

export const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
    transition: all 0.25s linear; 
    font-family: Arial, sans-serif;
    
  }

  h1, h2, h3 {
    color: darkblue;
   }
`;
