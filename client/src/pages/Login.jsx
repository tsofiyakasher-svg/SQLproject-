import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../App.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  let navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        if (
          res.message === "User not found" ||
          res.message === "Incorrect password"
        ) {
          setMessage("Incorrect username or password");
        } else {
          localStorage.setItem("ActiveUser", JSON.stringify(res.user));
          setMessage("");
          navigate("/home");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setMessage("Network error");
      });
  }
  return (
    <>
      {" "}
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsername}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
            required
          />

          <button type="submit">log in</button>

          <p>{message}</p>
          <Link to="SingUp">Sing Up</Link>
        </form>
      </div>
    </>
  );
}

export default Login;
