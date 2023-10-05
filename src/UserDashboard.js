// UserDashboard.js
import React from "react";
import "./userdashboard.css";
import CardComponent from "./CardComponent";

const UserDashboard = () => (
  <div className="user-dashboard">
    <div className="card-container">
      <CardComponent
        title="Library Book Service"
        body="Borrow your book with our Service Uni Online Booking"
        buttonText="Book Now"
        route="/LibraryService"
      />
      <CardComponent
        title="Volunteer Registration"
        body="Join your desired Club with Service Uni Registration"
        buttonText="Register Now"
        route = "/VolunteerRegistration"
      />
    </div>
  </div>
);

export default UserDashboard;
