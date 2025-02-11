import { useState, useEffect } from "react";
import { MessageContainer } from "./styles/Notify.styles";

interface NotifyProps {
  message: string;
  type?: "success" | "error" | "alert" | "info";
  duration?: number; // Tempo em milissegundos antes de desaparecer
}

export const Notify: React.FC<NotifyProps> = ({ message, type = "info", duration = 3000 }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return <MessageContainer type={type}>{message}</MessageContainer>;
};
