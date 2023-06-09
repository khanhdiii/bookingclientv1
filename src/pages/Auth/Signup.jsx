import { useState } from "react";
import React from "react";
import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import NavbarMenu from "../../components/navbar/NavbarMenu";
import MailList from "../../components/mailList/MailList";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmnedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    if (value.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
    } else {
      setUsernameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmedPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmnedPassword(value);
    if (password !== value) {
      setPasswordError("Password and confirmed password do not match");
    } else {
      setPasswordError("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters long");
      return;
    }

    try {
      const res = await axios.post(
        "https://bookingapiv1.onrender.com/api/auth/signup",
        {
          email,
          username,
          password,
        }
      );
      if (res) {
        setSuccessMessage("Created Account");

        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <>
      <NavbarMenu />
      {successMessage && (
        <Alert
          severity="success"
          onClose={() => setSuccessMessage("")}
          sx={{
            padding: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => setErrorMessage("")}
          sx={{ marginBottom: "10px" }}
        >
          {errorMessage}
        </Alert>
      )}
      <section className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="form-title">Create an Account</h2>
          <div className="form-group">
            <label className="label" htmlFor="name">
              Username
            </label>
            <input
              className="input"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange} // Gọi hàm handleUsernameChange
              placeholder="Username"
            />
            {usernameError && (
              <span className="error-message">{usernameError}</span>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email address
            </label>
            <input
              className="input"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            {passwordError && (
              <span className="error-message">{passwordError}</span>
            )}
          </div>

          <div className="form-group">
            <label className="label" htmlFor="confirmedpassword">
              Confirm Password
            </label>
            <input
              className="input"
              type="password"
              id="confirmedpassword"
              name="confirmedpassword"
              value={confirmedPassword}
              onChange={handleConfirmedPasswordChange}
              placeholder="Confirm your password"
            />
            {password !== confirmedPassword && (
              <span className="error-message">
                Password and confirmed password do not match
              </span>
            )}
          </div>

          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Create Account
          </button>
        </form>
      </section>{" "}
      <MailList />
    </>
  );
};

export default SignupForm;
