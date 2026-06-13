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
  <div style={{
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff8dc"
  }}>
    
    <div style={{
      width: "350px",
      padding: "30px",
      background: "#fffdf2",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      textAlign: "center"
    }}>
      
      <h1 style={{ marginBottom: "20px", color: "#5a4a00" }}>
        Register
      </h1>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #e6d8a8",
            borderRadius: "8px",
            outline: "none"
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #e6d8a8",
            borderRadius: "8px",
            outline: "none"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            border: "1px solid #e6d8a8",
            borderRadius: "8px",
            outline: "none"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#f6d365",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Register
        </button>
      </form>

      <div style={{ marginTop: "15px" }}>
        <Link to="/" style={{ color: "#8a6d00" }}>
          Already have an account? Login
        </Link>
      </div>

    </div>
  </div>
);
}