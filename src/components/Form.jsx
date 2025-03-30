import { useId, useState } from "react";

function Form() {
  const formId = useId();
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Отправлено: ${name}`);
  };

  return (
    <div>
      <button type="submit" form={formId}>
        Отправить форму
      </button>
      {/*Много другого кода*/}
      <form id={formId} onSubmit={handleSubmit}>
        <h3>Простая форма</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
      </form>
    </div>
  );
}

export default Form;
