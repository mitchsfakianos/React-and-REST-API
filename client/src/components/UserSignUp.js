import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = { 
            emailAddress: '',
            password: '',
            error: ''
        };
    }
    
  createUser(event) {
    event.preventDefault();

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let emailAddress = document.getElementById("emailAddress").value;
    let password = document.getElementById("password").value;

    if (firstName === '') {
        firstName = null;
    } 
    if (lastName === '') {
        lastName = null;
    }
    if (emailAddress === '') {
        emailAddress = null;
    }
    if (password === '') {
        password = null;
    }

    fetch("http://localhost:5000/api/users", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "emailAddress": emailAddress,
        "password": password
      })
    })
    .then((res) => {
      if(res.status === 204) {
        window.location.href="/";
      } else {
        return res.json();
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
                    <div class="form--centered">
                        <h2>Sign Up</h2>
                      {this.state.error.length !== 0?( /* validation errors div shows only the field that is empty */ 
                        <div class="validation--errors">
                            <h3>Validation Errors</h3>
                            <ul>
                            {this.state.error[0]?(<li>{this.state.error[0]}</li>):(null)}
                            {this.state.error[1]?(<li>{this.state.error[1]}</li>):(null)}
                            {this.state.error[2]?(<li>{this.state.error[2]}</li>):(null)}
                            {this.state.error[3]?(<li>{this.state.error[3]}</li>):(null)}
                            </ul>
                        </div>
                      ) : (
                        null
                      )}
                        
                        <form onSubmit={this.createUser.bind(this)}>
                            <label for="firstName">First Name</label>
                            <input id="firstName" name="firstName" type="text" />
                            <label for="lastName">Last Name</label>
                            <input id="lastName" name="lastName" type="text" />
                            <label for="emailAddress">Email Address</label>
                            <input id="emailAddress" name="emailAddress" type="email" />
                            <label for="password">Password</label>
                            <input id="password" name="password" type="password" />
                            <button class="button" type="submit">Sign Up</button><NavLink class="button button-secondary" to="/">Cancel</NavLink>
                        </form>
                        <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
                    </div>
                </main>
            )}
            </Consumer>
        );
    }
}

export default UserSignUp;