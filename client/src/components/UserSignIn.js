import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class UserSignIn extends Component {
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
                    <h2>Sign In</h2>
                    
                    <form>
                        <label for="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" />
                        <label for="password">Password</label>
                        <input id="password" name="password" type="password" />
                        <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
                    
                </div>
            </main>
        );
    }
}

export default UserSignIn;