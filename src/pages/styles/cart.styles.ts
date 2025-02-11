import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
  padding: 20px 160px;

  @media (max-width: 365px) {
    padding: 20px 20px;
  }

  @media (min-width: 365px) and (max-width: 576px) {
    padding: 20px 20px;
  }

  @media (min-width: 576px) and (max-width: 768px) {
    padding: 20px 100px;
  }

  @media (min-width: 768px) and (max-width: 992px) {
    padding: 20px 20px;
  }

  @media (min-width: 992px) and (max-width: 1200px) {
  }

   @media (min-width: 1200px) and (max-width: 1550px) {
    padding: 20px 20px;
  }

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CartSection = styled.div`
  flex: 2;
  border-radius: 8px;
`;

export const CartSectionTitle = styled.div`
  color: #41414d;
  font-family: Saira;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  text-transform: uppercase;
  `;

export const CartSectionSubtitle = styled.div`
  margin-bottom: 20px;
  color: #41414d;
  font-family: Saira;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 150%;

  & b{
    color: #41414d;
    font-family: Saira;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
  }
`;

export const SummarySection = styled.div`
  flex: 1;
  color: #737380;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: 1200px) {
    max-width: 100%;
  }
  
  & h2{
    font-weight: 500;
    color: #41414D;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  & hr{
    border-color: #ffffff73;
    margin: 20px 0 10px 0;
  }
`;

export const CartItemCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  justify-content: space-between;
  height: auto;
  overflow: hidden;
  transition: 0.2s ease-in-out;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CartItemImage = styled.div<{ imageUrl: string }>`
  flex-basis: 5%;
  flex-grow: 1;
  min-height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px 0px 0px 8px;
  position: relative;

  @media (max-width: 992px) {
    width: 100%;
  }

  img {
    display: none;
  }
`;

export const CartItemInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  background: #ffffff;
  gap: 20px;
`;

export const CartItemInfoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h3{
    width: 100%;
    color: #41414d;
    font-family: Saira;
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 150%;
  }
`;

export const CartItemInfoDesc = styled.div`
  color: #41414d;
  font-family: Saira;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
  cursor: default;
  width: auto;
`;

export const CartItemInfoFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  align-content: end;

  & p{
    font-weight: 500;
    font-size: 16px;
    font-family: Saira;
  }
`;

export const QuantityInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const QuantityButton = styled.button`
  padding: 5px 10px;
  font-size: 18px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  height: 31px;
  width: 31px;
  display: grid;
  align: items: center;
  justify-items: center;
  color: #737380;
  font-weight: bold;
  
  &:hover {
    background-color: #ccc;
  }
`;

export const QuantityField = styled.input`
  width: 50px;
  text-align: center;
  font-size: 16px;
  padding: 5px;
  border-radius: 8px;
  border: 2px solid #dddddd9c;
  color: #737380;

  &:focus-visible {
    outline: 1px solid #ededed;
  }
`;

export const RemoveButton = styled.button`
  display: flex;
  color: #DE3838;
  font-size: 18px;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const CheckoutButton = styled.button`
  height: 44px;
  padding: 10px;
  background-color: #51B853;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 30px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 16px;
  font-family: Saira;
  
  &:hover {
    background-color: #42ad44;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  & span{
    & b{
      color: #51B853;
    }
  }

  & strong{
    font-weight: 600;
    color: #41414D;
    font-size: 16px;
  }
`;

export const LinksContainer = styled.div`
  font-family: Saira;
  margin-top: auto;
  padding-top: 20px;
  text-decoration: underline;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
`;

export const SummaryLink = styled.a`
  display: block;
  margin-top: 5px;
  color: #737380;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;