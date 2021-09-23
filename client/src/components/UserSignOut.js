import { Component} from 'react';
import { withRouter } from 'react-router-dom';

class UserSignOut extends Component {
  componentDidMount() {
  	this.props.signOut();
  	this.props.history.push('/');
  }

  render() {
    return (
    	null
    )
  }
};

export default withRouter(UserSignOut);