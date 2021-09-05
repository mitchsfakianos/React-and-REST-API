import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: []
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

  onUpdateClass() {
    let newClass = { 
      title: this.refs.title.value,
      description: this.refs.description.value,
      estimatedTime: this.refs.estimatedTime.value,
      materialsNeeded: this.refs.materialsNeeded.value
    };

    fetch("http://localhost:5000/api/courses/${}", {
      method: "PUT",
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
              <h2>Update Course</h2>
              <form>
                  <div class="main--flex">
                      <div>
                          <label for="courseTitle">Course Title</label>
                          <input id="courseTitle" name="courseTitle" type="text">${this.state.course.title}</input>

                          <p>By Joe Smith</p>

                          <label for="courseDescription">Course Description</label>
                          <textarea id="courseDescription" name="courseDescription" value={this.state.course.description} contentEditable="true" />
                      </div>
                      <div>
                          <label for="estimatedTime">Estimated Time</label>
                          <input id="estimatedTime" name="estimatedTime" type="text" value={this.state.course.estimatedTime} contentEditable="true" />

                          <label for="materialsNeeded">Materials Needed</label>
                          <textarea id="materialsNeeded" name="materialsNeeded" value={this.state.course.materialsNeeded} contentEditable="true" />
                      </div>
                  </div>
                  <button class="button" type="submit" onClick={this.onUpdateClass}>Update Course</button><NavLink class="button button-secondary" to='/'>Cancel</NavLink>
              </form>
          </div>
      </main>
    )
  }
};

export default UpdateCourse;