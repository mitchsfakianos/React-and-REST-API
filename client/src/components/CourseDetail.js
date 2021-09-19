import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from './Context/index.js'

class CourseDetail extends Component {
  constructor() {
    super();
    this.state = {
      course: [],
      user: [],
      firstName: '',
      lastName: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => {
        this.setState({ course: data, 
          firstName: data.User.firstName,
          lastName: data.User.lastName
        })
      })
      .catch((err) => {
          console.log(err);
      }); 
  }

  deleteCourse(event, enc, email, pass) {
    event.preventDefault();

    const id = this.props.match.params.id;

    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-Type', 'application/json');
    let encoded = enc;
    let auth = 'Basic ' + encoded;
    h.append('Authorization', auth);

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
      mode: 'cors',
      headers: h,
      auth: {
        username: email,
        password: pass
      }
    })
    .then(window.location.href="/") // user is redirected after deleting a page
    .catch(console.log)
  }

  render() {
    return (
      <Consumer>
        { value => (
            <main>
                <div className="actions--bar">
                    { value.state.isAuthenticated && value.state.id === this.state.course.userId? (
                        <div className="wrap">
                          <NavLink className="button" to={"/courses/" + this.state.course.id + "/update"}>Update Course</NavLink>
                          <a className="button" onClick={(event) => this.deleteCourse(event, value.state.auth, value.state.emailAddress, value.state.password)} href="/">Delete Course</a>
                        </div>
                    ) : (
                      null
                    )} 
                    <div className="wrap">
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
                                  <p>By {this.state.firstName} {this.state.lastName}</p>
                                  <ReactMarkdown children={this.state.course.description} />
                              </div>
                              <div>
                                  <h3 className="course--detail--title">Estimated Time</h3>
                                  <p>{this.state.course.estimatedTime}</p>

                                  <h3 className="course--detail--title">Materials Needed</h3>
                                  <ul className="course--detail--list">
                                    <ReactMarkdown children={this.state.course.materialsNeeded} />
                                  </ul>
                              </div>
                        </div>
                    </form>
                </div>
            </main>
        )}
      </Consumer>
    )
  }
};

export default CourseDetail;