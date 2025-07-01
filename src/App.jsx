import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    if (token) {
      fetch("http://localhost:3000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user))
        .catch((err) => {
          console.log("Token fetch failed", err);
          localStorage.removeItem("jwt-token");
        });
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("jwt-token");
  };

  return (
    <>
      <NavigationBar user={user} handleLogout={handleLogout} />
    </>
  );
}

export default App;
