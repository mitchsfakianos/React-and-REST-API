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
                        <div className="form--centered">
                            <h2>Sign In</h2>
                            
                            <form>
                                <label htmlFor="emailAddress">Email Address</label>
                                <input id="emailAddress" name="emailAddress" type="email" />
                                <label htmlFor="password">Password</label>
                                <input id="password" name="password" type="password" />
                                <NavLink to="/" className="button" type="submit" onClick={()=> value.signin(document.getElementById("emailAddress").value, document.getElementById("password").value)}>Sign In</NavLink><NavLink className="button button-secondary" to="/">Cancel</NavLink>
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