import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  constructor() {
    super();
    this.state = {
      course: [],
      user: []
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ course: data }))
      .catch((err) => {
          console.log(err);
      });  
  }

  render() {
    return (
      <main>
          <div className="actions--bar">
              <div className="wrap">
                  <NavLink className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</NavLink>
                  <a className="button">Delete Course</a>
                  <NavLink className="button button-secondary" to="/">Return to List</NavLink>
              </div>
          </div>
          
          <div className="wrap">
              <h2>Course Detail</h2>
              <form>
                  <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{this.state.course.title}</h4>
                            <p>By Joe Smith</p>
                            <ReactMarkdown children={this.state.course.description} />
                        </div>
                        <div>
                            <h3 class="course--detail--title">Estimated Time</h3>
                            <p>{this.state.course.estimatedTime}</p>

                            <h3 class="course--detail--title">Materials Needed</h3>
                            <ul class="course--detail--list">
                              <ReactMarkdown children={this.state.course.materialsNeeded} />
                            </ul>
                        </div>
                  </div>
              </form>
          </div>
      </main>
    )
  }
};

export default CourseDetail;