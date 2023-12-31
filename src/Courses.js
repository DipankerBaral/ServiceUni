import React, { useState, useEffect } from "react";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch("https://peer-study.onrender.com/getCourses")
      .then((res) => res.json())
      .then((data) => {
        console.log("Courses Data:", data);
        setCourses(data);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      fetch(
        `https://peer-study.onrender.com/getEnrolledCourses?username=${user.username}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setEnrolledCourses(data.courses);
          } else {
            console.error("Error fetching enrolled courses:", data.message);
          }
        })
        .catch((error) =>
          console.error("Error fetching enrolled courses:", error)
        );
    }
  }, []);

  const enroll = async (courseId) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      try {
        const response = await fetch("https://peer-study.onrender.com/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ courseId, username: user.username }),
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          // Update the enrolledCourses state after a successful enrollment
          setEnrolledCourses((prevCourses) => [
            ...prevCourses,
            { course_id: courseId },
          ]);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error enrolling in course:", error);
      }
    } else {
      alert("User is not logged in.");
    }
  };

  const unenroll = async (courseId) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      try {
        const response = await fetch(
          "https://peer-study.onrender.com/unenroll",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ courseId, username: user.username }),
          }
        );
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          setEnrolledCourses((prevCourses) =>
            prevCourses.filter((course) => course.course_id !== courseId)
          );
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error("Error unenrolling from course:", error);
      }
    } else {
      alert("User is not logged in.");
    }
  };

  // Function to get course name by ID
  const getCourseName = (courseId) => {
    const course = courses.find((course) => course._id === courseId);
    return course ? course.name : "Unknown Course";
  };

  return (
    <div>
      <h1>Peer Assisted Study Session</h1>
      <h2>Available Courses</h2>
      {courses.length ? (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              {`Course: ${course.name} - Description: ${course.description}`}
              {enrolledCourses.some(
                (eCourse) => eCourse.course_id === course._id
              ) ? (
                <button onClick={() => unenroll(course._id)}>Unenroll</button>
              ) : (
                <button onClick={() => enroll(course._id)}>Enroll</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}

      <h2>Enrolled Courses</h2>
      {enrolledCourses.length ? (
        <ul>
          {enrolledCourses.map((enrolledCourse) => (
            <li key={enrolledCourse.course_id}>
              {/* Display course name based on ID */}
              {`Course Name: ${getCourseName(enrolledCourse.course_id)}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>No enrolled courses.</p>
      )}
    </div>
  );
}

export default Courses;
