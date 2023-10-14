import React, { useState, useEffect } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    fetch('https://mongo927-cd142ccce1aa.herokuapp.com/getCourses')
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
      fetch(`https://mongo927-cd142ccce1aa.herokuapp.com/getEnrolledCourses?username=${user.username}`)
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
        const response = await fetch('https://mongo927-cd142ccce1aa.herokuapp.com/enroll', {
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
        const response = await fetch('https://mongo927-cd142ccce1aa.herokuapp.com/unenroll', {
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
              <li key={course.id}>
                {`Course ${course.id}: ${course.name}`}
                {enrolledCourses.some(eCourse => eCourse.course_id === course.id) 
                  ? <button onClick={() => unenroll(course.id)}>Unenroll</button>
                  : <button onClick={() => enroll(course.id)}>Enroll</button>}
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