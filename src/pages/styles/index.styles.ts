import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  gap: 16px;
  padding: 30px 160px;

  @media (max-width: 365px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 30px 20px;
    justify-content: center;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 30px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 30px 20px;
  }
`;