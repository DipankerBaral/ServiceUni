import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./login";
import AnonymousReporting from "./AnonymousReporting";

// Import your components

const Routing = () => {
  // Your authentication logic to check if the user is logged in
  const isAuthenticated = true; // Replace this with your authentication check

  return (
    <Router>
      <Routes>
        {/* Public Route: Login page (accessible to everyone) */}
        <Route exact path="/" element={<Login />} />
        <Route
          exact
          path="/anonymousreporting"
          element={<AnonymousReporting />}
        />

        {/* Private Routes: Only accessible to authenticated users */}
      </Routes>
    </Router>
  );
};

export default Routing;
