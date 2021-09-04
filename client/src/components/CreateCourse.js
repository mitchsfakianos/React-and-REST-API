import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';

class CreateCourse extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      estimatedTime: '',
      materialsNeeded: '', 
      error: '',
    };
  }

  onCreateClass() {
    let newClass = { 
      title: this.refs.title.value,
      description: this.refs.description.value,
      estimatedTime: this.refs.estimatedTime.value,
      materialsNeeded: this.refs.materialsNeeded.value
    };

    fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(newClass)
    })
    .then(res=>res.json())
    .catch(console.log);
  };

  render() {
    return (
      <main>
          <div class="wrap">
              <h2>Create Course</h2>
              <div class="validation--errors">
                  <h3>Validation Errors</h3>
                  <ul>
                      <li>Please provide a value for "Title"</li>
                      <li>Please provide a value for "Description"</li>
                  </ul>
              </div>
              <form>
                  <div class="main--flex">
                      <div>
                          <label for="courseTitle">Course Title</label>
                          <input id="courseTitle" name="title" ref="title" type="text" />

                          <p>By Joe Smith</p>

                          <label for="courseDescription">Course Description</label>
                          <textarea id="courseDescription" ref="description" name="courseDescription"></textarea>
                      </div>
                      <div>
                          <label for="estimatedTime">Estimated Time</label>
                          <input id="estimatedTime" name="estimatedTime" ref="time" type="text" />

                          <label for="materialsNeeded">Materials Needed</label>
                          <textarea id="materialsNeeded" ref="materials" name="materialsNeeded"></textarea>
                      </div>
                  </div>
                  <button class="button" type="submit" onClick={this.onCreateClass}>Create Course</button><NavLink class="button button-secondary" to='/'>Cancel</NavLink>
              </form>
          </div>
      </main>
    )
  }
};

export default CreateCourse;