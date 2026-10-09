import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const initialForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  };
  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = "Name is required";
    if (!formData.email.trim()) nextErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = "Enter a valid email";
    if (!formData.password) nextErrors.password = "Password is required";
    else if (formData.password.length < 6) nextErrors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword) nextErrors.confirmPassword = "Please confirm your password";
    else if (formData.confirmPassword !== formData.password) nextErrors.confirmPassword = "Passwords do not match";
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
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccessMessage("Registration successful. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1200);
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || "Registration failed. Please try again." });
    }
  };
  return (
    <main className="page form-page">
      <div className="form-card">
        <p className="eyebrow">JOIN CASANEST</p>
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter your full name" />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Create a password" />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" />
            {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
          </div>
          {errors.submit && <p className="error-banner">{errors.submit}</p>}
          {successMessage && <p className="success-banner">{successMessage}</p>}  
        <button type="submit" className="primary-button">Create Account</button>
        </form>
        <p className="form-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
}
export default Register;