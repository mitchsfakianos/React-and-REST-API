import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/courses')
      .then(response => response.json())
      .then(data => this.setState({ courses: data }))
      .catch(console.log);
  }

  render() {
    return (
        <main>
          <div className="wrap main--grid">
          {this.state.courses.map((course) =>
              <NavLink to={`/courses/${course.id}`} className="course--module course--link" key={course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
              </NavLink>
          )}
            <NavLink className="course--module course--add--module" to="/courses/create">
              <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
              </span>
            </NavLink>
          </div>
        </main>
    )
  }
};

export default Courses;