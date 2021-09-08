import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { Consumer } from './Context/index.js';

export default class Header extends Component {
  render() {
    return (
      <Consumer>
        { value => {
          return (
            <header>
              <div className="wrap header--flex">
                <h1 className="header--logo"><NavLink to="/">Courses</NavLink></h1>
                {value.state.isAuthenticated ? (
                  <nav>
                    <ul className="header--signedin">
                      <li><span>Welcome, {value.state.firstName} {value.state.lastName}!</span></li>
                      <li><NavLink to='/signout' className="signout">Sign Out</NavLink></li>
                    </ul>
                  </nav>
                ) : (
                    <nav>
                      <ul className="header--signedout">
                        <li><NavLink to='/signup' className="signup">Sign Up</NavLink></li>
                        <li><NavLink to='/signin' className="signin">Sign In</NavLink></li>
                      </ul>
                    </nav>
                )}
              </div>
            </header>
          )}}
      </Consumer>
    )
  }
};