import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setLoggedIn } = useOutletContext();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password);
    fetch("http://localhost:3000/api/auth/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "Logged in as ADMIN") {
          // store token in localStorage
          localStorage.setItem("jwt-token", res.token);
          alert(res.message);
          setEmail("");
          setPassword("");
          setLoggedIn(true);
          navigate("/");
        } else {
          alert(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <p>Admin Login:</p>
      <form onSubmit={handleSubmit}>
        {/* <label htmlFor="email">Admin email: </label> */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="password"
          name="password"
          required
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
