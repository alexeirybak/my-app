import { useId, useState } from "react";

function AccessibleForms() {
  const baseId = useId();
  const [forms, setForms] = useState(() => [
    {
      id: `${baseId}-form-1`,
      fields: [
        {
          id: `${baseId}-field-1-1`,
          label: "Имя",
          value: "",
        },
        {
          id: `${baseId}-field-1-2`,
          label: "Фамилия",
          value: "",
        },
      ],
    },
  ]);

  // Добавление новой формы
  const addForm = () => {
    const newFormId = `${baseId}-form-${forms.length + 1}`;
    setForms((prev) => [
      ...prev,
      {
        id: newFormId,
        fields: [
          {
            id: `${newFormId}-1`,
            label: "Имя",
            value: "",
          },
          {
            id: `${newFormId}-2`,
            label: "Фамилия",
            value: "",
          },
        ],
      },
    ]);
  };

  // Добавление нового поля
  const addField = (formId) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              fields: [
                ...form.fields,
                {
                  id: `${formId}-${form.fields.length + 1}`,
                  label: `Доп. поле ${form.fields.length + 1}`,
                  value: "",
                },
              ],
            }
          : form
      )
    );
  };

  // Обновление значения поля
  const handleChange = (formId, fieldId, value) => {
    setForms((prev) =>
      prev.map((form) =>
        form.id === formId
          ? {
              ...form,
              fields: form.fields.map((field) =>
                field.id === fieldId ? { ...field, value } : field
              ),
            }
          : form
      )
    );
  };

  // Вывод данных (без label)
  const showData = () => {
    const result = forms.map((form) => ({
      formId: form.id.replace(`${baseId}-`, ""),
      values: form.fields.map((field) => field.value), // Только значения
    }));
    alert(JSON.stringify(result, null, 2));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {forms.map((form) => (
        <div
          key={form.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "20px",
            borderRadius: "4px",
          }}
        >
          <h3 style={{ marginTop: 0 }}>Клиент {form.id.split("-").pop()}</h3>

          {form.fields.map((field) => (
            <div
              key={field.id}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <label
                htmlFor={field.id}
                style={{
                  minWidth: "100px",
                  marginRight: "10px",
                  textAlign: "right",
                }}
              >
                {field.label}:
              </label>
              <input
                id={field.id}
                type="text"
                value={field.value}
                onChange={(e) =>
                  handleChange(form.id, field.id, e.target.value)
                }
                style={{
                  padding: "8px",
                  flex: 1,
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          ))}

          <button
            onClick={() => addField(form.id)}
            style={{
              padding: "6px 12px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Добавить поле
          </button>
        </div>
      ))}

      {forms.length > 0 && (
        <>
          <button
            onClick={showData}
            style={{
              padding: "10px 15px",
              backgroundColor: "#FF5722",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            Показать данные
          </button>
          <button
            onClick={addForm}
            style={{
              padding: "10px 15px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              margin: "10px",
            }}
          >
            Добавить форму
          </button>
        </>
      )}
    </div>
  );
}

export default AccessibleForms;
