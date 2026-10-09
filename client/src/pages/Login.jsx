import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const validate = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email";
    if (!formData.password) nextErrors.password = "Password is required";
    return nextErrors;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    try {
      await login({ email: formData.email, password: formData.password });
      navigate("/shop");
    } catch (error) {
      setSubmitMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };
  return (
    <main className="page form-page">
      <div className="form-card">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Login to CasaNest</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          {submitMessage && <p className="error-banner">{submitMessage}</p>}
          <button type="submit" className="primary-button">Login</button>
        </form>
        <p className="form-switch">
          New here? <Link to="/register">Go to Register</Link>
        </p>
      </div>
    </main>
  );
}
export default Login;