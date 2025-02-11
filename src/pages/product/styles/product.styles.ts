import styled from "styled-components";

export const ProductDetailContainer = styled.div`
  padding: 20px 160px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 365px) {
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 20px 30px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 20px 40px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 30px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    padding: 20px 30px;
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
  }
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  justify-content: center;

  @media (max-width: 365px) {
  gap: 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
  gap: 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    gap: 20px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    gap: 40px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
    gap: 40px;
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;

  @media (min-width: 768px) {
    width: 50%;
    max-width: 600px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
    max-width: 450px;
  }
`;

export const ProductCategory = styled.h1`
  color: #41414d;
  font-family: Saira;
  font-size: 16px;
  font-weight: 400;
  margin-top: 5px;
`;

export const ProductName = styled.h1`
  color: #41414d;
  font-family: Saira;
  font-size: 32px;
  font-weight: 300;
  line-height: 100%;
  margin-top: 12px;
`;

export const ProductPrice = styled.p`
  color: #09090a;
  font-family: Saira;
  font-size: 20px;
  font-weight: 600;
  line-height: 100%;
  margin-top: 4px;
`;

export const ShippingCost = styled.p`
  color: #41414d;
  font-family: Saira;
  font-size: 12px;
  font-weight: 400;
  line-height: 100%;
  margin-top: 24px;
`;

export const ProductDescriptionTitle = styled.p`
  color: #737380;
  font-family: Saira;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 50px 0 -10px 0;

  @media (max-width: 365px) {
    margin: 15px 0 -10px 0;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    margin: 15px 0 -10px 0;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin: 15px 0 -10px 0;
  }
`;

export const ProductDescription = styled.p`
  color: #41414d;
  font-family: Saira;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
`;

export const AddToCartButton = styled.button`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  background-color: #115d8c;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
  gap: 12px;
  padding: 10px 0px;
  border: none;
  cursor: pointer;
  color: #f5f5fa;
  font-family: Saira;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  text-transform: uppercase;

  &:hover {
    background-color: #0f4d7b;
  }

  @media (max-width: 365px) {
    margin-top: 40px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    margin-top: 40px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    margin-top: 40px;
  }
`;