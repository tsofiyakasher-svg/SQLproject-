import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../App.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [verified, setVerified] = useState("");
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password || !email || !phone) {
      setMessage("Please fill in all fields.");
    } else if (password !== verified) {
      setMessage("Your passwords don’t match");
    } else {
      fetch("http://localhost:3000/signUp/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: username,
          password,
          verified,
          email,
          phone,
        }),
      })
        .then((response) => response.json())
        .then((res) => {
          console.log(res.message);
          if (res.message === "User created successfully") {
            setMessage("User created successfully");
            localStorage.setItem(
              "ActiveUser",
              JSON.stringify({
                id: res.id,
                user_name: res.user_name,
                email: res.email,
                phone: res.phone,
              })
            );
            navigate("/home");
          } else if (res.message === "The user already exists") {
            setMessage("The user already exists");
          } else {
            setMessage(res.error || "Failed to create user");
          }
        })
        .catch((err) => {
          console.error("Error:", err);
          setMessage("Network error");
        });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Verify Password"
          value={verified}
          onChange={(e) => setVerified(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>

        <p>{message}</p>
        <Link to="/login">Already have an account? Login</Link>
      </form>
    </div>
  );
}

export default Signup;
