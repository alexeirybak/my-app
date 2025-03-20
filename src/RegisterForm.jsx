export const RegisterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={formData.username || ""}
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      <div>
        <label>Пароль:</label>
        <input
          type="password"
          value={formData.password || ""}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </div>
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};
