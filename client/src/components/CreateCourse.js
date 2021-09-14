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

    console.log(enc)

    let h = new Headers();
    h.append('Accept', 'application/json');
    h.append('Content-Type', 'application/json');
    let encoded = enc;
    let auth = 'Basic ' + encoded;
    h.append('Authorization', auth);

    fetch("http://localhost:5000/api/courses", {
      method: "POST",
      mode: 'cors',
      headers: h,
      auth: {
        username: email,
        password: pass
      },
      body: JSON.stringify({
        "title": `${(document.getElementById("courseTitle").value)}`,
        "description": `${document.getElementById("courseDescription").value}`,
        "estimatedTime": `${document.getElementById("estimatedTime").value}`,
        "materialsNeeded": `${document.getElementById("materialsNeeded").value}`,
        "userId": id
      })
    })
    .then(res=>res.json())
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <Consumer>
        { value => (
          <main>
              <div class="wrap">
                  <h2>Create Course</h2>
                  {this.state.error !== ''? (
                    <div class="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
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

                              <p>By Joe Smith</p>

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