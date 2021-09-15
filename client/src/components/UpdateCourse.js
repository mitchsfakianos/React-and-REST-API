import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Consumer } from './Context/index.js';

class UpdateCourse extends Component {
  constructor() {
    super();
    this.state = {
      course: {},
      err: ''
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
          materialsNeeded: data.materialsNeeded
        } }))
      .catch((err) => {
          console.log(err);
      });  
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

    fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "PUT",
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
        "userId": userId
      })
    })
    .then(res => res.json())
    .then(window.location.href=url)
    .catch(console.log);
  }

  render() {
    return (
      <Consumer>
      { value => (
        <main>
            <div class="wrap">
                <h2>Update Course</h2>
                <form>
                    <div class="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" defaultValue={this.state.course.title}/>

                            <p>By Joe Smith</p>

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