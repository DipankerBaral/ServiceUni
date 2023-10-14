// UserDashboard.js
import React from "react";
import "./userdashboard.css";
import CardComponent from "./CardComponent";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };
  return (
    <div className="user-dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <div className="card-container">
        <CardComponent
          title="Peer Assisted Study Session"
          body="Enroll in courses that will help you progress your studies!"
          buttonText="Enroll now"
          route="/Courses"
        />
        <CardComponent
          title="Volunteer Registration"
          body="Join your desired Club with Service Uni Registration"
          buttonText="Register Now"
          route="/VolunteerRegistration"
        />
      </div>
    </div>
  );
}

export default UserDashboard;
