import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js'

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
            <Consumer>
            { value => {
                return (
                    <main>
                        <div class="form--centered">
                            <h2>Sign In</h2>
                            
                            <form>
                                <label for="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" />
                                <label for="password">Password</label>
                                <input id="password" name="password" type="password" />
                                <NavLink to="/" class="button" type="submit" onClick={()=> value.signin(document.getElementById("emailAddress").value, document.getElementById("password").value)}>Sign In</NavLink><NavLink class="button button-secondary" to="/">Cancel</NavLink>
                            </form>
                            <p>Don't have a user account? Click here to <NavLink to="/signup">sign up</NavLink>!</p>
                            
                        </div>
                    </main>
                    )
                }
            }
            </Consumer>
        );
    }
}

export default UserSignIn;