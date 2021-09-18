import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js';

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      error: ''
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ 
        course: {
          title: data.title,
          description: data.description,
          estimatedTime: data.estimatedTime,
          materialsNeeded: data.materialsNeeded,
          user: data.User
        } }))
      .catch((err) => {
          console.log(err);
      });

    console.log(this.state.course.User)  
  }

  onUpdateClass(event, enc, email, pass, userId) {
    event.preventDefault();

    const id = this.props.match.params.id;
    const url = ("/courses/" + id);

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
      if(res.status === 204) {
        console.log("hi")
        window.location.href="/";
      } else {
        res.json();
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
            <div class="wrap">
                <h2>Update Course</h2>
                  {this.state.error.length !== 0?( // validation errors div shows only the field that is empty 
                    <div class="validation--errors">
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
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={this.state.course.title}/>

                            <p>By {this.state.course.User.firstName} {value.state.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" defaultValue={this.state.course.description} />
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={this.state.course.estimatedTime} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={this.state.course.materialsNeeded} />
                        </div>
                    </div>
                    <button class="button" type="submit" onClick={(event) => this.onUpdateClass(event, value.state.auth, value.state.emailAddress, value.state.password, value.state.id)}>Update Course</button><NavLink class="button button-secondary" to={`/courses/${this.props.match.params.id}`}>Cancel</NavLink>
                </form>
            </div>
        </main>
      )}
      </Consumer>
    )
  }
};

export default UpdateCourse;