import React from 'react';
import { Consumer } from './Context/index.js';

const UserSignOut = props => {
    return(
        <>
        <Consumer>
        { value => (
            value.signout()
        )}
        </Consumer>
        </>
    )
}

export default UserSignOut;