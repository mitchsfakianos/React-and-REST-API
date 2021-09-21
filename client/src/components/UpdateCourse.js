import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js';

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      error: '',
      firstName: '',
      lastName: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => this.setState({  /* I could not access any of the properties in the User object in the render section through the course. So I assigned them to their own states here and in course detail */
        course: {
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          user: data.User
        }, 
        firstName: data.User.firstName,
        lastName: data.User.lastName
      }))
      .catch((err) => {
          console.log(err);
      });
  }

  onUpdateClass(event, enc, email, pass, userId) {
    event.preventDefault();

    const id = this.props.match.params.id;

    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-Type', 'application/json');
    let auth = 'Basic ' + enc;
    h.append('Authorization', auth);

    // grabbing each value from the form after submission
    let title = document.getElementById("courseTitle").value;
    let description = document.getElementById("courseDescription").value;
    let time = document.getElementById("estimatedTime").value;
    let materials = document.getElementById("materialsNeeded").value;

    if (title === '') { // setting empty values to null so they will be caught by the API, otherwise an empty string goes through
      title = null;
    }

    if (description === '') {
      description = null;
    } 

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
      mode: 'cors',
      headers: h,
      auth: {
        username: email,
        password: pass
      },
      body: JSON.stringify({
        "title": title,
        "description": description,
        "estimatedTime": time,
        "materialsNeeded": materials,
        "userId": userId
      })
    })
    .then((res) => {
      if(res.status !== 204) {
        return res.json();
      } else {
        this.setState({
          error: ''
        })
      }
    })
    .then((data) => {
      this.setState({
        error: data.errors
      })
    })
    .catch(console.log);
  }

  render() {
    return (
      <Consumer>
      { value => (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                  {this.state.error.length !== 0?( // validation errors div shows only the field that is empty 
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                        {this.state.error[0]?(<li>{this.state.error[0]}</li>):(null)}
                        {this.state.error[1]?(<li>{this.state.error[1]}</li>):(null)}
                        </ul>
                    </div>
                  ) : (
                    null
                  )}
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={this.state.course.title}/>

                            <p>By {this.state.firstName} {this.state.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={this.state.course.description} />
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={this.state.course.estimatedTime} />

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={this.state.course.materialsNeeded} />
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={(event) => this.onUpdateClass(event, value.state.auth, value.state.emailAddress, value.state.password, value.state.id)}>Update Course</button><NavLink className="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</NavLink>
                </form>
            </div>
        </main>
      )}
      </Consumer>
    )
  }
};

export default UpdateCourse;