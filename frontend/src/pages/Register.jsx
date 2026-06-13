import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
  console.log(error.response?.data || error.message);
  alert(error.response?.data?.message || "Registration failed");
}
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Register</h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>
      </form>

      <br />

      <Link to="/">
        Already have an account? Login
      </Link>
    </div>
  );
}