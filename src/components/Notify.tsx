import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

interface NotifyProps {
  message: string;
  type?: "success" | "error" | "alert" | "info";
  duration?: number; // Tempo em milissegundos antes de desaparecer
}

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-10px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-10px); }
`;

const typeStyles = {
  success: css`
    background-color: #4caf50;
  `,
  error: css`
    background-color: #f44336;
  `,
  alert: css`
    background-color: #ff9800;
  `,
  info: css`
    background-color: #2196f3;
  `,
};

const MessageContainer = styled.div<{ type: "success" | "error" | "alert" | "info" }>`
  position: fixed;
  top: 20px;
  right: 20px;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeInOut} 3s ease-in-out;
  z-index: 1000;
  ${({ type }) => typeStyles[type] || typeStyles.info};
`;

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
