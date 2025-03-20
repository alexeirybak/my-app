import useForm from "./hooks/useForm";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ProfileForm } from "./ProfileForm";

const App = () => {
  const loginData = useForm({});
  const registerData = useForm({});
  const profileData = useForm({});

  const handleSubmit = (e, formType) => {
    e.preventDefault();
    if (formType === "login") {
      console.log("Данные авторизации", loginData.formData);
    } else if (formType === "password") {
      console.log("Данные регистрации", loginData.formData);
    } else formType === "";
    {
      console.log("Иные данные", profileData.formData);
    }
  };

  return (
    <div>
      <h1>Авторизация</h1>
      <LoginForm
        {...loginData}
        handleSubmit={(e) => handleSubmit(e, "login")}
      />
      <h1>Регистрация</h1>
      <RegisterForm
        {...registerData}
        handleSubmit={(e) => handleSubmit(e, "password")}
      />
      <p>---------------</p>
      <ProfileForm {...profileData} handleSubmit={(e) => handleSubmit(e, "")} />
    </div>
  );
};

export default App;
