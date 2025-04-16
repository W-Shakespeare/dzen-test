import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { socket } from "./components/Header/Header";

function App() {
  useEffect(() => {
    return () => {
      socket.disconnect();
      console.log("socket.disconnect (App)");
    };
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
