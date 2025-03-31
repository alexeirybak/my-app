import styled, { keyframes, css } from "styled-components";

export const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(244, 67, 54, 0.4);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 0 6px rgba(244, 67, 54, 0);
  }
`;

export const VoiceInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const VoiceButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.secondary};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  padding: 0;
  color: ${(props) => props.theme.text};

  &:hover {
    background-color: ${(props) => props.theme.border};
  }

  ${(props) =>
    props.$isListening &&
    css`
      background-color: ${props.theme.danger};
      color: white;
      animation: ${pulse} 1.5s infinite ease-in-out;
    `}

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 16px;
  }
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.danger};
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;

  @media (max-width: 480px) {
    font-size: 11px;
    max-width: 150px;
  }
`;
