// AnonymousReporting.js
import React, { useState } from "react";
import "./AnonymousReporting.css"; // Import the CSS file for this component

const AnonymousReporting = () => {
  const [formData, setFormData] = useState({
    time: "",
    location: "",
    description: "",
    subject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send the formData to your backend or store it in a database
    console.log("Form Data:", formData);
    // You can add an API call or database storage logic here
  };

  return (
    <div className="anonymous-reporting">
      <div className="title">Anonymous Reporting of Security Concern</div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            className="ainput"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            className="ainput"
            type="text"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            className="ainput"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AnonymousReporting;
