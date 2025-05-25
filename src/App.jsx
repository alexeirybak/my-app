import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/dataSlice";
import { useState } from "react";

export function App() {
  const [showPosts, setShowPosts] = useState();
  const { posts, isLoading, error } = useSelector((state) => state.data);
  // const isLoading = useSelector((state) => state.data.isLoading);
  // const error = useSelector((state) => state.data.error);

  const dispatch = useDispatch();

  const fetchPosts = () => {
    dispatch(fetchData("https://jsonplaceholder.typicode.com/posts"));
  };

  const handleShowPosts = () => {
    if (posts.length > 0) {
      setShowPosts(true);
    }
  };

  return (
    <>
      <button onClick={fetchPosts} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Получить посты"}
      </button>
      <button onClick={handleShowPosts}>Показать посты</button>
      {error && <p className="text-red-500">Ошибка: {error}</p>}
      {showPosts && (
        <div>
          <h3>Списокк постов</h3>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p className="text-2xl text-gray-600">{post.title}</p>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
