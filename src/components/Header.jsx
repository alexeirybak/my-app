import { useUserContext } from "../contexts/UserContext";
import UserInfo from "./UserInfo";

function Header() {
  const user = useUserContext();
  return (
    <div>
      <h1>Добро пожаловать, {user.name}!</h1>
      <UserInfo />
    </div>
  );
}

export default Header;
