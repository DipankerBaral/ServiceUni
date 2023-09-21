import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./login";
import AnonymousReporting from "./AnonymousReporting";
import UserDashboard from "./UserDashboard";
import VolunteerRegistration from "./VolunterRegistration";
import AdminDashboard from "./AdminDashboard";

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
        <Route
          exact
          path="/UserDashboard"
          element={<UserDashboard />}
        />
        <Route
          exact
          path="/VolunteerRegistration"
          element={<VolunteerRegistration />}
        />
        <Route
          exact
          path="/AdminDashboard"
          element={<AdminDashboard />}
        />

        {/* Private Routes: Only accessible to authenticated users */}
      </Routes>
    </Router>
  );
};

export default Routing;
