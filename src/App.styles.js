import styled from "styled-components";

export const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 24px;
  color: ${(props) => props.theme.text};
`;

export const ThemeToggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.secondary};
  border: none;
  width: 40px;
  height: 40px;
  font-size: 20px;
  cursor: pointer;
  border-radius: 50%;
  transition: all 0.3s ease;
  color: ${(props) => props.theme.text};

  &:hover {
    transform: rotate(30deg);
  }
`;

export const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FilterButton = styled.button`
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.border};
  background-color: ${(props) =>
    props.$active ? props.theme.primary : props.theme.secondary};
  color: ${(props) => (props.$active ? "white" : props.theme.text)};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$active ? props.theme.primary : props.theme.border};
  }
`;

export const ClearButton = styled.button`
  margin-left: auto;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;
