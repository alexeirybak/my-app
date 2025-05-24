const InputTask = ({text, handleInput, addTodo}) => {
  return (
    <label>
      <input
        className="border-1 border-green-600"
        type="text"
        value={text}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={addTodo}>Добавить задачу</button>
    </label>
  );
};

export default InputTask;
