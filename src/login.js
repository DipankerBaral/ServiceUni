import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null); // Store the logged-in user
  const navigate = useNavigate();
  let matchingStudent = null;
  // User Login info
  const database = []; // Initialize an empty array
  const backgroundImageUrl =
    "https://live-production.wcms.abc-cdn.net.au/07de6b31c4f08d58e715ecc7837f0db6?impolicy=wcms_crop_resize&cropH=1080&cropW=1920&xPos=0&yPos=100&width=862&height=485"; // Replace with the actual online URL to your background image
  // Make an HTTP request to the API
  fetch("https://serviceunibackend.onrender.com/api/getRegisterData")
    .then((response) => response.json())
    .then((data) => {
      // Assuming the API response is an array of objects with properties like "Username," "Password," and "Role"
      data.forEach((item) => {
        // Check if the properties exist before accessing them
        const username = item.Username?.S || "";
        const password = item.Password?.S || "";
        const role = item.Role?.S || "";

        const user = {
          username,
          password,
          role,
        };
        database.push(user); // Add the user to the database array
      });

      // Now your "database" array is populated with data from the API
      console.log(database);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  const errors = {
    uname: "Invalid username",
    pass: "Invalid password",
  };

  useEffect(() => {
    // Check if a user is already logged in from localStorage
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleRegister = () => {
    // Navigate to the registration page
    navigate("/register"); // Replace "/register" with the desired route path for registration
  };

  const handleLogout = () => {
    // Remove the user information from localStorage and reset the state
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole"); // Remove user role from localStorage
    setLoggedInUser(null);
    setIsSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;
    //  Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        // Store user information in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        localStorage.setItem("userRole", userData.role); // Store user role in localStorage

        setLoggedInUser(userData);
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

  // //////////////My edit while maintaning your structure. Please check

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const { uname, pass } = event.target.elements;

  //   try {
  //       const response = await fetch("http://localhost:3001/login", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ username: uname.value, password: pass.value })
  //       });

  //       const data = await response.json();
  //       console.log("Received Data from backend: ", data); //for debugging

  //       if (data.success) {
  //           const userData = {
  //               username: data.user, // Updated this
  //               role: data.role      // Updated this
  //           };

  //           localStorage.setItem("loggedInUser", JSON.stringify(userData));
  //           localStorage.setItem("userRole", userData.role);

  //           setLoggedInUser(userData);
  //           // Remove or comment out the next line since it won't show the updated value immediately
  //           console.log("Logged In User: ", loggedInUser); // for debugging
  //           setIsSubmitted(true);
  //           if (userData.role === "admin") {
  //               navigate("/admindashboard");
  //           // } else if (userData.role === "peer") {
  //           //   navigate("/courses");
  //           } else {
  //               navigate("/userdashboard");
  //           }

  //       } else {
  //           setErrorMessages({ name: "uname", message: "Invalid username or password" });
  //       }
  //   } catch (error) {
  //       console.error("Error logging in:", error);
  //   }
  // };

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
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
    </div>
  );
  const navigateToAnonymousReporting = () => {
    navigate("/anonymousreporting"); // Replace with the desired route
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: "cover", // Adjust the background size as needed
        minHeight: "100vh", // Ensure the div takes the full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px", // Add padding to create space below the top of the screen
      }}
    >
      <div className="login-form">
        <div className="title">Sign In</div>
        {loggedInUser ? (
          <div>
            <p>User is successfully logged in as {loggedInUser.username}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div>
            {renderForm}
            <button
              id="anonymous-reporting-button"
              onClick={navigateToAnonymousReporting}
            >
              Do Anonymous Reportings
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
