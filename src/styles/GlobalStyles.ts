import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }

  body {
    font-family: Saira;
    background-color: #f0f0f0;
  }

  h1{
    font-weight: 400;
  }
`;

export const GlobalContainer = styled.div`
`;

export const Body = styled.div`
  padding: 20px 160px;
  
  @media (max-width: 365px) {
    gap: 20px;
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 20px 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 20px 20px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 20px 20px;
  }
`;

export default GlobalStyle;
