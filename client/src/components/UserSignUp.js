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
    
    render() {
        return (
            <main>
                <div class="form--centered">
                    <h2>Sign Up</h2>
                    
                    <form>
                        <label for="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" />
                        <label for="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" />
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" />
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" />
                        <button class="button" type="submit">Sign Up</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <NavLink to="/signin">sign in</NavLink>!</p>
                </div>
            </main>
        );
    }
}

export default UserSignUp;