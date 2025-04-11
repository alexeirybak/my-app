const CheckboxButton = ({ completed, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded-full border-2 cursor-pointer ${
        completed
          ? "border-green-500 bg-green-500"
          : "border-gray-300 hover:border-gray-400"
      } transition-colors duration-300`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-4 w-4 ${completed ? "text-white" : "text-transparent"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  );
};

export default CheckboxButton;
