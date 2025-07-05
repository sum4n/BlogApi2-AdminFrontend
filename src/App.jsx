import "./App.css";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

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
  }, [loggedIn]);

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
    localStorage.removeItem("jwt-token");
    navigate("/user/login");
  };

  return (
    <>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Outlet context={{ user, setLoggedIn }} />
    </>
  );
}

export default App;
