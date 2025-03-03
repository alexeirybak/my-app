import { useState } from "react";

function ControlledForm() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Имя было отправлено: " + value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
}

export default ControlledForm;
