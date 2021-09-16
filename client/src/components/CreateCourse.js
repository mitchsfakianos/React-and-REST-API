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
      titleError: '',
      descError: ''
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

    let title = document.getElementById("courseTitle").value;
    let description = document.getElementById("courseDescription").value;
    let time = document.getElementById("estimatedTime").value;
    let materials = document.getElementById("materialsNeeded").value;

    if (title !== '' && description !== '') {
      fetch("http://localhost:5000/api/courses", {
        method: "POST",
        mode: 'cors',
        headers: h,
        auth: {
          username: email,
          password: pass
        },
        body: JSON.stringify({
          "title": `${title}`,
          "description": `${description}`,
          "estimatedTime": `${time}`,
          "materialsNeeded": `${materials}`,
          "userId": id
        })
      })
      .then(res=>res.json())
      .then(window.location.href="/")
      .catch((err) => {
        console.error(err);
      });
    }

    if (title === '') {
      this.setState({
        titleError: 'Please provide a value for "Title"'
      })
      console.log(this.state.titleError)
    } else {
      this.setState({
        titleError: ''
      })
    }

    if (description === '') {
      this.setState({
        descError: 'Please provide a value for "Description"'
      })
    } else {
      this.setState({
        descError: ''
      })
    }
  };

  render() {
    return (
      <Consumer>
        { value => (
          <main>
              <div class="wrap">
                  <h2>Create Course</h2>
                  {this.state.titleError !== '' || this.state.descError !== ''? (
                    <div class="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {this.state.titleError !== ''? (
                            <li>{this.state.titleError}</li>
                            ) : ( null )}
                            {this.state.descError !== ''? (
                            <li>{this.state.descError}</li>
                            ) : ( null )}
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