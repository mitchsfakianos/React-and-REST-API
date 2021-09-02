import React, { Component} from 'react'

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
      <div id="root">
        <header>
          <div className="wrap header--flex">
            <h1 className="header--logo"><a href="index.html">Courses</a></h1>
            <nav>
              <ul className="header--signedout">
                <li><a href="sign-up.html">Sign Up</a></li>
                <li><a href="sign-in.html">Sign In</a></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className="wrap main--grid">
          {this.state.courses.map((course) =>
              <a className="course--module course--link" href="course-detail.html" key={course.id}>
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">{course.title}</h3>
              </a>
          )}
            <a className="course--module course--add--module" href="create-course.html">
              <span className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
              New Course
              </span>
            </a>
          </div>
        </main>
      </div>
    )
  }
};

export default Courses;