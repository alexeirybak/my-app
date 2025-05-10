import { useContext } from "react";
import { NetworkContext } from "../contexts/NetworkContext";

const Notification = () => {
  const { networkStatus } = useContext(NetworkContext);
  const { isOnline, showNotification, message } = networkStatus;

  if (!showNotification) return null;

  return (
    <div
      className={`mt-2 p-2 rounded text-sm ${
        isOnline ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
      }`}
    >
      {message}
    </div>
  );
};

export default Notification;
