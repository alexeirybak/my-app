import { Comment } from "./Comment";

export function CommentList({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} author={comment.author} text={comment.text} />
      ))}
    </div>
  );
}
