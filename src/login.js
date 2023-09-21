import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  // User Login info

  const database = [
    {
      username: "user1",
      password: "pass1",
      role: "user",
    },
    {
      username: "admin",
      password: "adminpass",
      role: "admin",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    var { uname, pass } = document.forms[0];
  
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);
  
    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        if (userData.role === "admin") {
          // Navigate to AdminDashboard.js
          navigate("/admindashboard"); // Replace with the desired route path for the admin
        } else {
          // Navigate to UserDashboard.js
          navigate("/userdashboard"); // Replace with the desired route path for regular users
        }
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };
  

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );
  const navigateToAnonymousReporting = () => {
    navigate("/anonymousreporting"); // Replace with the desired route
  };

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          <div>
            {renderForm}
            <button
              id="anonymous-reporting-button"
              onClick={navigateToAnonymousReporting}
            >
              Do Anonymous Reporting
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
