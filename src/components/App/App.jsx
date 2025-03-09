function App() {
  return (
    <div className="container bg-gray-900 mx-auto my-10 py-10">
      <h1 className="text-4xl font-bold text-blue-900 text-center mt-22.5">
        React + Tailwind
      </h1>
      <div className="bg-blue-500 w-30 rounded-4xl text-center mx-auto border-4 border-amber-400 mt-30">
        Это блок
      </div>
      <button className="bg-red-600 w-1/3 rounded-full mx-auto block mt-20 hover:bg-red-400 text-white transition-color duration-900">
        Кнопка
      </button>
      <div className="flex flex-col md:flex-row justify-around items-center p-6 m-10 bg-gray-200">
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 m-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9LMEZ98BFIeJ67iVA4E4uSuL22xygYJ2kaQ&s"
            alt="Рисунок 1"
            className="rounded-full mb-2 w-40 max-h-24 transition-transform duration-300  transform hover:scale-105"
          />
          <h2 className="text-xl font-semibold">Заголовок 1</h2>
          <p className="text-gray-600"></p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 m-2">
          <img
            src="https://na-zapade-mos.ru/files/data/user/AiF/olga.k/files/2020/2020.07.30-1596116320.3183_nature-3474826-1920-1.jpg"
            alt="Рисунок 2"
            className="rounded-full mb-2 w-40 max-h-24 transition-transform duration-300  transform hover:scale-105"
          />
          <h2 className="text-xl font-semibold">Заголовок 1</h2>
          <p className="text-gray-600"></p>
        </div>
        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 m-2">
          <img
            src="https://oclo.ru/wp-content/uploads/2023/10/priroda-rossii-6.webp"
            alt="Рисунок 3"
            className="rounded-full mb-2 w-40 max-h-24 transition-transform duration-300  transform hover:scale-105"
          />
          <h2 className="text-xl font-semibold">Заголовок 1</h2>
          <p className="text-gray-600"></p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
        <div className="bg-gray-200 rounded-lg overflow-hidden">
          <img
            src="https://kudann.ru/uploads/b6b4164a5bd6bb8d7b91a5f24fd42d6b.jpeg"
            alt="Рисунок"
            className="w-full h-48 object-cover transition-transform duration-300  transform hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center p-6 bg-gray-100">
        <div className="flex flex-col bg-white shadow-md rounded-lg m-4 p-4 w-64">
          <h2 className="text-lg font-bold">Карточка 1</h2>
          <p className="text-gray-600">Это описание первой карточки</p>
          <button className="mt-2 bg-blue-500 text-white rounded-lg py-2 cursor-pointer">
            Действие
          </button>
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-lg m-4 p-4 w-64">
          <h2 className="text-lg font-bold">Карточка 2</h2>
          <p className="text-gray-600">Это описание второй карточки</p>
          <button className="mt-2 bg-blue-500 text-white rounded-lg py-2 cursor-pointer">
            Действие
          </button>
        </div>
        <div className="flex flex-col bg-white shadow-md rounded-lg m-4 p-4 w-64">
          <h2 className="text-lg font-bold">Карточка 3</h2>
          <p className="text-gray-600">Это описание третьей карточки</p>
          <button className="mt-2 bg-blue-500 text-white rounded-lg py-2 cursor-pointer">
            Действие
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
