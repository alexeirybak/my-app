import styled from "styled-components";

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: ${(props) => props.theme.secondary};
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  margin-bottom: 8px;
  border: 1px solid ${(props) => props.theme.border};

  ${(props) =>
    props.$isDragging &&
    `
    opacity: 0.5;
    background-color: ${props.theme.primary}20;
    transform: scale(1.02);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  `}

  ${(props) =>
    props.$completed &&
    `
    background-color: ${props.theme.secondary}80;
  `}
`;

export const Checkbox = styled.input`
  margin-right: 12px;
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

export const TodoText = styled.span`
  flex-grow: 1;
  margin-right: 12px;
  word-break: break-word;
  padding: 2px 0;
  cursor: text;
  transition: all 0.2s;

  ${(props) =>
    props.$completed &&
    `
    text-decoration: line-through;
    color: ${props.theme.text}80;
  `}
`;

export const EditInput = styled.input`
  flex-grow: 1;
  padding: 8px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  margin-right: 12px;
  font-size: inherit;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.primary}20;
  }
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.text}80;
  font-size: 20px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.danger}20;
    color: ${(props) => props.theme.danger};
  }

  @media (max-width: 480px) {
    font-size: 18px;
    width: 22px;
    height: 22px;
  }
`;
