// import React, { useEffect,useState } from "react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./VolunterRegistration.css";
const VolunteerRegistration = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };


  const loggedInUserData = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(loggedInUserData);
  const user_name = loggedInUser.username;

  const [volunteerActivities, setVolunteerActivities] = useState([]);

  useEffect(() => {
    // const apiUrl = `http://localhost:8000/api/volunteer/?student_id=${student_id}`;
    // const apiUrl = `http://localhost:8000/api/volunteer/?user_name=${user_name}`;
    let apiUrl;

    if (process.env.NODE_ENV === 'development') {
      // DEV
      apiUrl = `http://localhost:8000/api/volunteer/?user_name=${user_name}`;
    } else {
      // PROD
      apiUrl = '';
    }

  
    // Use Axios to make a GET request
    axios.get(apiUrl)
      .then(response => {
        // Handle the response data
        const data = response.data;
        // Update your component state with the data
        setVolunteerActivities(data);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error fetching data:', error);
      });
  }, [user_name]); 


  // Function to handle enrolling or unenrolling a student
  const handle_enroll_unenroll = (activity_id, is_enrolled) => {
    // const apiUrl = `http://localhost:8000/api/volunteer_enroll_unenroll/`;
    let apiUrl;

    if (process.env.NODE_ENV === 'development') {
      // DEV
      apiUrl = 'http://localhost:8000/api/volunteer_enroll_unenroll/';
    } else {
      // PROD
      apiUrl = '';
    }

    const requestData = {
      // student_id: student_id,
      user_name: user_name,
      status: is_enrolled ? "unenroll" : "enroll",
      activity_id: activity_id
    };
  
    // Send a POST request to enroll/unenroll the student
    axios.post(apiUrl, requestData)
      .then(response => {
        const updatedActivities = volunteerActivities.map(activity => {
          if (activity.act_id === activity_id) {
            return {
              ...activity,
              is_enrolled: !is_enrolled, // Toggle enrollment status
              num_of_spots: is_enrolled
                ? activity.num_of_spots + 1
                : activity.num_of_spots - 1, // Update spots
            };
          }
          return activity;
        });

        // Update the component state with the updated data
        setVolunteerActivities(updatedActivities);
      })
      .catch(error => {
        // Handle any errors
        console.error('Error enrolling/unenrolling:', error);
      });
  };
  

  return (
    <div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2>Volunteer Registration</h2>
      <table>
        <thead>
          <tr>
            <th className="activity_col">Volunteer Activities</th>
            <th className="spot_col">Number of Spots Left</th>
            <th className="act_col">Action</th>
          </tr>
        </thead>
        <tbody>
          {volunteerActivities.map((activity) => (
            <tr key={activity.act_id}>
              <td className="activity_col">{activity.activity_name}</td>
              <td className="spot_col">{activity.num_of_spots}</td>
              <td className="act_col">
                <button
                  onClick={() => handle_enroll_unenroll(activity.act_id, activity.is_enrolled)}
                  disabled={activity.can_enroll === false}
                >
                  {activity.is_enrolled ? "Unenroll" : "Enroll"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerRegistration;
