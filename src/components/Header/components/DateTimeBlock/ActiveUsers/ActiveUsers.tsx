import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../../../hooks/useTypedSelector";
import { socket } from "../../../Header";
import { Container } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { selectIsAuth } from "../../../../../redux/Auth";

export const ActiveUsers: React.FC = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const IsAuth = useTypedSelector(selectIsAuth);
  console.log("ActiveUsers");

  useEffect(() => {
    socket.on("updateUserCount", (count: number) => {
      setActiveUsers(count);
    });

    return () => {
      socket.off("updateUserCount");
      console.log("OfupdateUserCount");
    };
  }, []);

  useEffect(() => {
    if (IsAuth && !socket.connected) {
      socket.connect();
      const token = localStorage.getItem("auth");
      if (token) socket.auth = { token };

      console.log("socket.connect");
    }
  }, [IsAuth]);

  return (
    <Container
      style={{ padding: "10px", background: "#f2f2f2", borderRadius: "8px" }}
    >
      <Person size={24} />: {activeUsers}
    </Container>
  );
};
