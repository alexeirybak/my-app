import { useImperativeHandle } from "react";
import { useRef } from "react";

const Post = ({ ref, comments }) => {
  const commentsRef = useRef(null);
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    scrollAndFocus: () => {
      if (commentsRef.current) {
        commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
        console.dir(commentsRef.current);
      }
      if(inputRef.current) {
        inputRef.current.focus()
      }
    },
  }));

  return (
    <div>
      <h2>Пост</h2>
      <div
        ref={commentsRef}
        style={{
          height: "50px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Post;
