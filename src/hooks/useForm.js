import { useDebugValue, useState } from "react";

const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);

  useDebugValue(formData, (data) => {
    return `Данные формы: ${JSON.stringify(data)}`;
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return formData;
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
