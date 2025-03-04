import { forwardRef } from "react";

export const Input = forwardRef(({ label, onChange, onBlur, name }, ref) => (
  <div>
    <label>{label}</label>
    <input name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
  </div>
));

// Задаем displayName для компонента
Input.displayName = "Input";
