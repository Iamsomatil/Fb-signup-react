import React, { useState } from "react";
import "./App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
    day: "1",
    month: "Jan",
    year: "2024",
    gender: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", formData);
    }
  };

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "firstName":
        if (!value) {
          error = "First name is required";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          error = "Invalid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;
      case "day":
        if (!value) {
          error = "Day is required";
        }
        break;
      case "month":
        if (!value) {
          error = "Month is required";
        }
        break;
      case "year":
        if (!value) {
          error = "Year is required";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required";
        }
        break;
      default:
        break;
    }
    setErrors(prevState => ({
      ...prevState,
      [fieldName]: error
    }));
  };

  const validateForm = () => {
    let isValid = true;
    Object.keys(formData).forEach(fieldName => {
      const value = formData[fieldName];
      const error = validateField(fieldName, value);
      if (error) {
        isValid = false;
      }
    });
    return isValid;
  };

  return (
    <div className="container">
      <form className="form-box" onSubmit={handleSubmit}>
        <h1>Create a new account</h1>
        <p>It's quick and easy.</p>

        <input 
          type="text" 
          name="firstName"
          placeholder="First name" 
          value={formData.firstName}
          onChange={handleChange}
          required 
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        <label>Date of Birth</label>
        <div className="dob">
          <select name="day" value={formData.day} onChange={handleChange} required>
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          {errors.day && <div className="error">{errors.day}</div>}
          <select name="month" value={formData.month} onChange={handleChange} required>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          {errors.month && <div className="error">{errors.month}</div>}
          <select name="year" value={formData.year} onChange={handleChange} required>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.year && <div className="error">{errors.year}</div>}
        </div>

        <label>Gender</label>
        <div className="gender">
          <input
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={formData.gender === "female"}
            onChange={handleChange}
            required
          />
          <label htmlFor="female">Female</label>
          <input 
            type="radio" 
            id="male" 
            name="gender" 
            value="male"
            checked={formData.gender === "male"}
            onChange={handleChange} 
            required 
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="custom"
            name="gender"
            value="custom"
            checked={formData.gender === "custom"}
            onChange={handleChange}
            required
          />
          <label htmlFor="custom">Custom</label>
        </div>
        {errors.gender && <div className="error">{errors.gender}</div>}

        <input
          type="email"
          name="email"
          placeholder="Mobile number or email address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input 
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required 
          minLength="6"
        />
        {errors.password && <div className="error">{errors.password}</div>}

        <p className="info-text">
          People who use our service may have uploaded your contact information
          to Facebook. <a href="#">Learn more.</a>
        </p>
        <p className="terms-text">
          By clicking Sign Up, you agree to our <a href="#">Terms</a>,{" "}
          <a href="#">Privacy Policy</a> and <a href="#">Cookies Policy</a>. You
          may receive SMS notifications from us and can opt out at any time.
        </p>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>
        <p className="login-link">
          Already have an account? <a href="#">Log In</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
