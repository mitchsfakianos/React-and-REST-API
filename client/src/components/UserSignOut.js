import React from 'react';
import { Redirect } from 'react-router-dom';
import { Consumer } from './Context/index.js';

const UserSignOut = props => {
    return(
        <>
        <Consumer>
        { value => (
            value.signout()
        )}
        </Consumer>
        <Redirect to="/" />
        </>
    )
}

export default UserSignOut;