import AddUser from "./components/AddUser";
import DeleteUser from "./components/DeleteUser";
import UpdateUser from "./components/UpdateUser";
import UserList from "./components/UserList";

const App = () => {
  return (
    <>
      <UserList />
      <p>------------------</p>
      <AddUser />
      <p>------------------</p>
      <UpdateUser />
      <p>------------------</p>
      <DeleteUser />
    </>
  );
};

export default App;
