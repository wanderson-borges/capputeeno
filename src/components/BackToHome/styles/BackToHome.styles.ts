import styled from "styled-components";

export const BackButton = styled.button`
  border: 1px solid #5d5d6d;
  color: #5d5d6d;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-top: 20px;
  font-family: Saira;
  font-weight: 500;
  background: transparent;
  position: relative;

  & span {
    margin-left: 85px;
    position: absolute;
  }

  &:hover {
    background-color: rgb(221, 223, 224);
  }
`;