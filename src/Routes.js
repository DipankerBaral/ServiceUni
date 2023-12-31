import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./login";
import AnonymousReporting from "./AnonymousReporting";
import UserDashboard from "./UserDashboard";
import VolunteerRegistration from "./VolunterRegistration";
import AdminDashboard from "./AdminDashboard";
import LibraryService from "./LibraryService"; // Import the LibraryService component
import Register from "./register";
import Courses from "./Courses";  // <-- Added this import

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
        <Route exact path="/UserDashboard" element={<UserDashboard />} />
        <Route
          exact
          path="/VolunteerRegistration"
          element={<VolunteerRegistration />}
        />
        <Route exact path="/AdminDashboard" element={<AdminDashboard />} />
        {/* Add the route for the LibraryService */}
        <Route exact path="/LibraryService" element={<LibraryService />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/courses" element={<Courses />} />  {/* <-- Added this route */}
        {/* Private Routes: Only accessible to authenticated users */}
      </Routes>
    </Router>
  );
};

export default Routing;
