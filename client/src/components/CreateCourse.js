import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js';

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '', 
      error: ''
    };
  }

  createClass(id, enc, email, pass, event) {        
    event.preventDefault();

    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-Type', 'application/json');
    let encoded = enc;
    let auth = 'Basic ' + encoded;
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

    fetch("http://localhost:5000/api/courses", {
      method: "POST",
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
        "userId": id
      })
    })
    .then((res) => { // if we get a bad request, we read the data and put the errors into the error state
      if (res.status === 400) {
        return res.json()
      } 
    })
    .then((data) => {
      this.setState({
        error: data.errors
      })
    });
  };

  render() {
    return (
      <Consumer>
        { value => (
          <main>
              <div class="wrap">
                  <h2>Create Course</h2>
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
                              <input id="courseTitle" name="title" type="text" />

                              <p>By {value.state.firstName} {value.state.lastName}</p>

                              <label for="courseDescription">Course Description</label>
                              <textarea id="courseDescription" name="courseDescription"></textarea>
                          </div>
                          <div>
                              <label for="estimatedTime">Estimated Time</label>
                              <input id="estimatedTime" name="estimatedTime" type="text" />

                              <label for="materialsNeeded">Materials Needed</label>
                              <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                          </div>
                      </div>
                      // once this form is submitted through the button click, createclass function is called
                      <button class="button" type="submit" onClick={(event) => this.createClass(value.state.id, value.state.auth, value.state.emailAddress, value.state.password, event)}>Create Course</button><NavLink class="button button-secondary" to='/'>Cancel</NavLink>
                  </form>
              </div>
          </main>
        )}
      </Consumer>
    )
  }
};

export default CreateCourse;