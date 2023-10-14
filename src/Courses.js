import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/getCourses')
      .then(res => res.json())
      .then(data => {
        console.log("Courses Data:", data);
        if(data.success && data.courses) {
          setCourses(data.courses);
        }
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      fetch(`http://localhost:3001/getEnrolledCourses?username=${user.username}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setEnrolledCourses(data.courses);
          } else {
            console.error('Error fetching enrolled courses:', data.message);
          }
        })
        .catch(error => console.error('Error fetching enrolled courses:', error));
    }
  }, []);

  const enroll = async (courseId) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      try {
        const response = await fetch('http://localhost:3001/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, username: user.username })
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          // Update the enrolledCourses state after a successful enrollment
          setEnrolledCourses(prevCourses => [...prevCourses, { course_id: courseId }]);
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error enrolling in course:', error);
      }
    } else {
      alert('User is not logged in.');
    }
  };

  const unenroll = async (courseId) => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      try {
        const response = await fetch('http://localhost:3001/unenroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ courseId, username: user.username })
        });
        const data = await response.json();
        if (data.success) {
          alert(data.message);
          setEnrolledCourses(prevCourses => prevCourses.filter(course => course.course_id !== courseId));
        } else {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error unenrolling from course:', error);
      }
    } else {
      alert('User is not logged in.');
    }
  };

  return (
    <div>
      <h1>Peer Assisted Study Session</h1>
      <h2>Available Courses</h2>
      {courses.length ? (
        <ul>
          {courses.map(course => (
            <li key={course.course_id}>
              {`Course ${course.course_id}: ${course.course_name}`}
              {enrolledCourses.some(eCourse => eCourse.course_id === course.course_id) 
                ? <button onClick={() => unenroll(course.course_id)}>Unenroll</button>
                : <button onClick={() => enroll(course.course_id)}>Enroll</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses available.</p>
      )}
    </div>
  );
}

export default Courses;