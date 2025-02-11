import styled from "styled-components";

export const Card = styled.div`
  border-radius: 8px;
  background: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export const ProductInfo = styled.div`
  padding: 0px 12px 10px 12px;

  & hr{
    border-color: #ffffff73;
    margin: 5px 0;
  }
`;

export const ProductName = styled.h2`
  margin: 5px 0;
  color: #41414d;
  font-size: 16px;
  font-family: Saira;
  font-weight: 400;
`;

export const ProductPrice = styled.p`
  color: #333;
  font-size: 14px;
  font-family: Saira;
  font-weight: 600;
`;