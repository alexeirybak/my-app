import { CommentList } from "./CommentList";

export function Comments() {
  const comments = [
    { id: 1, author: "Иван", text: "Отличный пост!" },
    { id: 2, author: "Мария", text: "Спасибо за информацию." },
    { id: 3, author: "Петр", text: "Интересно, но можно подробнее." },
  ];

  return (
    <div>
      <CommentList comments={comments} />
    </div>
  );
}
