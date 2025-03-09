import * as S from "../components/Button/Button.styled";

const HomePage = () => {
  return (
    <>
      {/* <S.Button>Нормальная кнопка</S.Button>
      <S.Input type="search" placeholder="Найти" />
      <S.Input type="password" placeholder="Пароль" />
      <DangerButton>Опасная кнопка</DangerButton> */}

      {/* <S.Title>Заголовок</S.Title>
      <S.Subtitle>Подзаголовок</S.Subtitle> */}
      <S.AnimatedComponent>Анимация</S.AnimatedComponent>
      <S.ResponsiveComponent>Адаптив</S.ResponsiveComponent>
      <S.ButtonByTheme>Кнопка со стилями темы</S.ButtonByTheme>
    </>
  );
};

export default HomePage;
