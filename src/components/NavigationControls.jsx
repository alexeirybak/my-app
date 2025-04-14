import { useNavigate } from "react-router";

const NavigationControls = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <button onClick={() => navigate(1)}>Вперед</button>
      <button onClick={() => navigate(-2)}>На 2 назад</button>
      <button onClick={() => navigate(2)}>На 2 вперед</button>
    </div>
  );
};

export default NavigationControls;
