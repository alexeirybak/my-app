import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 400px) {
    gap: 6px;
  }
`;

export const TextInput = styled.input`
  flex: 1 1 200px;
  min-width: 0;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.border};
  border-radius: 4px;
  font-size: 16px;
  background-color: ${(props) => props.theme.body};
  color: ${(props) => props.theme.text};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.primary};
    box-shadow: 0 0 0 2px ${(props) => props.theme.primary}20;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    padding: 8px 10px;
  }

  @media (max-width: 360px) {
    flex-basis: 100%;
  }
`;

export const AddButton = styled.button`
  padding: 10px 16px;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark || "#388e3c"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 14px;
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;
