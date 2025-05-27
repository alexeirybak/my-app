import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./store/dataSlice";
import { useRef, useState } from "react";

export function App() {
  const [showPosts, setShowPosts] = useState();
  const { posts, isLoading, error } = useSelector((state) => state.data);
  // const isLoading = useSelector((state) => state.data.isLoading);
  // const error = useSelector((state) => state.data.error);

  const fetchPromise = useRef();

  const dispatch = useDispatch();

  const fetchPosts = () => {
    fetchPromise.current = dispatch(
      fetchData("https://jsonplaceholder.typicode.com/posts")
    );
  };

  const handleShowPosts = () => {
    if (posts.length > 0) {
      setShowPosts(true);
    }
  };

  const handleCancelFetch = () => {
    if (fetchPromise.current) {
      fetchPromise.current.abort();
    }
  };

  return (
    <>
      <button onClick={fetchPosts} disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Получить посты"}
      </button>
      <button onClick={handleShowPosts}>Показать посты</button>
      {isLoading && (
        <button onClick={handleCancelFetch}>Отменить запрос</button>
      )}
      {error && (
        <div>
          {error.status === 404 && <p>Данные не найдены</p>}
          {error.status === 0 && ""}
          {error.status === "NETWORK_ERROR" && <p>Нет подключения</p>}
        </div>
      )}
      {showPosts && (
        <div>
          <h3>Список постов</h3>
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
