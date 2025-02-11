import styled from "styled-components";

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