import { User } from "./User";

function UserList() {
  const users = [
    { id: 1, name: "Иван", age: 25 },
    { id: 2, name: "Мария", age: 30 },
    { id: 3, name: "Петр", age: 28 },
  ];

  return (
    <div>
      {users.map((user) => (
        <User key={user.id} name={user.name} age={user.age} />
      ))}
    </div>
  );
}

export default UserList;
