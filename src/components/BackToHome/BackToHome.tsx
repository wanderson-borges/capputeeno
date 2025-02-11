import { useRouter } from "next/router";
import { TbArrowBackUp } from "react-icons/tb";
import { BackButton } from "./styles/BackToHome.styles";

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
      <TbArrowBackUp data-testid="back-icon" />
      <span>Voltar</span>
    </BackButton>
  );
};
