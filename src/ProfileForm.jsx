export const ProfileForm = ({ handleChange, handleSubmit, formData }) => {
  return (
    <form onSubmit={handleSubmit}>
      {/* Текстовое поле */}
      <div>
        <label htmlFor="firstName">Имя:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName || ""}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />
      </div>

      {/* Текстовое поле */}
      <div>
        <label htmlFor="lastName">Фамилия:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName || ""}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />
      </div>

      {/* Поле email */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>

      {/* Textarea */}
      <div>
        <label htmlFor="bio">О себе:</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
        />
      </div>

      {/* Выпадающий список (select) */}
      <div>
        <label htmlFor="country">Страна:</label>
        <select
          id="country"
          name="country"
          value={formData.country || ""}
          onChange={(e) => handleChange("country", e.target.value)}
        >
          <option value="">Выберите страну</option>
          <option value="Russia">Россия</option>
          <option value="USA">США</option>
          <option value="Germany">Германия</option>
        </select>
      </div>

      {/* Радиокнопки (radio buttons) */}
      <div>
        <label>Пол:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === "male"}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          Мужской
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={(e) => handleChange("gender", e.target.value)}
          />
          Женский
        </label>
      </div>

      {/* Кнопка отправки формы */}
      <button type="submit">Сохранить</button>
    </form>
  );
};
