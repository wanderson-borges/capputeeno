import styled from "styled-components";

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

  @media (max-width: 365px) {
    font-size: 12px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    font-size: 12px;
  }
`;