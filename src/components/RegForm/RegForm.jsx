import { useState } from "react";
import {
  validatePassword,
  checkPasswordMatch,
  checkRequiredFields,
} from "./validators";
import "./RegForm.css";

function RegForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [selectedYear, setSelectedYear] = useState("");
  const [requiredFieldsError, setRequiredFieldsError] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleYearChange = (e) => setSelectedYear(e.target.value);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
    setPasswordMatch(checkPasswordMatch(newPassword, confirmPassword));
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordMatch(checkPasswordMatch(password, newConfirmPassword));
  };

  const years = Array.from(
    { length: 40 },
    (_, i) => new Date().getFullYear() - i
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFieldsFilled = checkRequiredFields([
      name,
      email,
      password,
      confirmPassword,
      selectedYear,
    ]);

    const isFormValid = allFieldsFilled && isPasswordValid && passwordMatch;

    if (!isFormValid) {
      setRequiredFieldsError(true);
      setShowSuccessMessage(false);
      return;
    }

    setRequiredFieldsError(false);
    setShowSuccessMessage(true);

    const formData = {
      name,
      email,
      password,
      confirmPassword,
      selectedYear,
    };

    alert(JSON.stringify(formData, null, 2));

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setIsPasswordValid("");
    setConfirmPassword("");
    setSelectedYear("");
  };

  return (
    <div className="section">
      <h1>Форма регистрации</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Имя" onChange={handleNameChange} />
        <input type="email" placeholder="email" onChange={handleEmailChange} />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={handlePasswordChange}
        />
        {!isPasswordValid && (
          <div className="error-message">
            Пароль должен состоять из латинских букв и цифр, а также быть не
            менее 8 символов
          </div>
        )}

        <input
          type="password"
          placeholder="Подтвердите пароль"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          style={{ color: passwordMatch ? "green" : "red" }}
        />
        {!passwordMatch && (
          <div className="error-message">Пароли пока не совпадают</div>
        )}

        <select value={selectedYear} onChange={handleYearChange}>
          <option value="">Дата окончания учебного заведения:</option>
          {years.map((year) => (
            <option key={year.toString()} value={year}>
              {year}
            </option>
          ))}
        </select>

        <button type="submit">Отправить</button>
        <button type="reset" onClick={handleReset}>
          Очистить форму
        </button>
        {requiredFieldsError && (
          <div className="error-message">Проверьте заполнение полей формы</div>
        )}
        {showSuccessMessage && (
          <div className="success-message">Данные успешно отправлены</div>
        )}
      </form>
    </div>
  );
}

export default RegForm;
