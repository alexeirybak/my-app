import styled from "styled-components";

export const TodoListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;

  /* Для очень маленьких экранов (280-360px) */
  @media (max-width: 360px) {
    gap: 6px;
  }

  /* Для средних мобильных экранов (361-480px) */
  @media (min-width: 361px) and (max-width: 480px) {
    gap: 7px;
  }

  /* Ландшафтный режим на мобильных */
  @media (max-width: 768px) and (orientation: landscape) {
    gap: 6px;
    max-height: 60vh;
    overflow-y: auto;

    /* Стилизация скроллбара */
    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) => props.theme.border};
      border-radius: 2px;
    }
  }

  @media (min-width: 1024px) {
    gap: 10px;
  }
`;
