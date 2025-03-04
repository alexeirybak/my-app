import { useForm } from "react-hook-form";
import { Input } from "../components/CustomForms/Input";
import { Select } from "../components/CustomForms/Select";
import { Checkbox } from "../components/CustomForms/CheckBox";
import { Textarea } from "../components/CustomForms/Textarea";
import "./CustomForm.css";

// НЕ ЗАБУДЬТЕ УСТАНОВИТЬ ЗАВИСИМОСТИ: npm install
export const CustomForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // Получаем ошибки валидации
  } = useForm();
  const onSubmit = (data) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Имя"
        {...register("name", {
          required: "Обязательное поле",
          minLength: {
            value: 3,
            message: "Минимум 3 символа",
          },
        })}
        {...register("name", { required: "Обязательное поле" })}
      />
      {errors.name && <span className="error">{errors.name.message}</span>}
      <Select
        label="Возраст"
        {...register("age", { required: "Выберите возраст" })}
      />

      <Checkbox label="Подписаться на рассылку" {...register("subscribe")} />

      <Textarea
        label="Комментарий"
        {...register("comment", {
          required: "Комментарий обязателен",
          minLength: {
            value: 50,
            message: "Минимум 50 символов",
          },
          maxLength: {
            value: 5000,
            message: "Максимум 5000 символов",
          },
        })}
      />
      {errors.comment && (
        <span className="error">{errors.comment.message}</span>
      )}

      <button type="submit">Отправить</button>
    </form>
  );
};
