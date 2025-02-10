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

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Saira Stencil One', sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400 !important;
  line-height: 150%;
  color: #5D5D6D;
  padding: 20px 160px;

  @media (max-width: 365px) {
    gap: 20px;
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    gap: 20px;
    padding: 20px 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 20px;
    padding: 20px 20px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 20px 20px;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
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

export const RightSection = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 768px) {
    flex-direction: row;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SearchBar = styled.div`
  @media (max-width: 365px) {
    width: 85%;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    width: 85%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
  height: 124px;
  align-items: center;
`;

export const NavLink = styled.a<{ selected: boolean }>`
  text-decoration: none;
  font-size: 16px;
  font-family: Saira;
  color: ${(props) => (props.selected ? "#41414d" : "#737380")};
  font-weight: ${(props) => (props.selected ? "bold" : "normal")};
  padding-bottom: 4px;
  border-bottom: ${(props) => (props.selected ? "4px solid #ffa585" : "4px solid transparent")};
  cursor: pointer;

  &:hover {
    color: #41414d;
  }

  @media (max-width: 365px) {
    font-size: 12px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    font-size: 12px;
  }
`;

export default GlobalStyle;
