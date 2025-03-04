import { forwardRef } from "react";

export const Select = forwardRef(({ label, onChange, onBlur, name }, ref) => (
  <div>
    <label>{label}</label>
    <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
      <option value="">Выберите...</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
    </select>
  </div>
));

Select.displayName = "Select";
