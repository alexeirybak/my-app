import { useState, useRef } from "react";

function MixedForm() {
  const [name, setName] = useState("");
  const emailRef = useRef(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Имя: ${name}, Email: ${emailRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Email:
        <input type="email" ref={emailRef} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default MixedForm;
