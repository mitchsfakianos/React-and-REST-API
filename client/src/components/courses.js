import React from 'react'

const Courses = ({ courses }) => {
  return (
    <div>
      <center><h1>Course List</h1></center>
      {courses.map((course) => (
        <div>
          <div>
            <h5>{course.title}</h5>
            <h6>{course.description}</h6>
          </div>
        </div>
      ))}
    </div>
  )
};

export default Courses