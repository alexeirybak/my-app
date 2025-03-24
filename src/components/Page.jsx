import { useRef, useState } from "react";
import Post from "./Post";

function Page() {
  const postRef = useRef(null);
  const inputRef = useRef(null);

  const [comments, setComments] = useState([
    { id: 1, text: "Комментарий 1" },
    { id: 2, text: "Комментарий 2" },
    { id: 3, text: "Комментарий 3" },
    { id: 4, text: "Комментарий 4" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: Date.now(),
        text: newComment,
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");

      postRef.current.scrollAndFocus();
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <h1>Страница с постом</h1>
      <Post ref={postRef} comments={comments} />
      <input
        ref={inputRef}
        type="text"
        placeholder="Введите комментарий..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Добавить комментарий</button>
    </div>
  );
}

export default Page;
