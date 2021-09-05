import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class UserSignUp extends Component {
    constructor() {
        super();
        this.state = { 
            emailAddress: '',
            password: ''
        };
    }
    
  createUser(e) {        
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "firstName": `${document.getElementById("firstName").value}`,
        "lastName": `${document.getElementById("lastName").value}`,
        "emailAddress": `${document.getElementById("emailAddress").value}`,
        "password": `${document.getElementById("password").value}`
      })
    })
    .then(res=>res.json())
    .catch((err) => {
      this.setState({
        error: err.response.data.errors
      })
    });
  };

    render() {
        return (
            <main>
                <div class="form--centered">
                    <h2>Sign Up</h2>
                    
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
        );
    }
}

export default UserSignUp;