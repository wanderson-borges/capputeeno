import styled from "styled-components";
import { useRouter } from "next/router";
import { TbArrowBackUp } from "react-icons/tb";

const BackButton = styled.button`
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

interface BackToHomeProps {
  onClick?: () => void;
}

export const BackToHome: React.FC<BackToHomeProps> = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push("/");
    }
  };

  return (
    <BackButton onClick={handleClick}>
      <TbArrowBackUp />
      <span>Voltar</span>
    </BackButton>
  );
};
