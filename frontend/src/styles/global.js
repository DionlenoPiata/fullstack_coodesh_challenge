import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');

  html, body, #root {
    height: 100%;
  }
  body {
    font: 14px 'Roboto', sans-serif;
    background: #363636;
    color: #333;
    -webkit-font-smoothing: antialiased !important;
  }
`;
