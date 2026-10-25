import { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  usePageTitle("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await API.post("/auth/login", { email, password });
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
      <h1>Welcome back</h1>
      <p className="auth-subtitle">Login to your account.</p>
      {error && <p className="p-error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="button button-primary full-width" type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
      <p className="auth-footer">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
      </div>
    </main>
  );
};

export default Login;
