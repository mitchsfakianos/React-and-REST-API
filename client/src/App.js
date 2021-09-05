import './styles/global.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Courses from './components/courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			user: {
				id: '',
				firstName: '',
				lastName: '',
				emailAddress: '',
				password: ''
			}
		}
	}

	signIn() {

	}

	signOut() {

	}

	render () {
		return (
		  <Router>
		    <div>
		      <Header />
		      <Switch>  
		        <Route exact path="/" render={() => <Courses />} />
		        <Route exact path="/courses/create" component={CreateCourse} />
		        <Route exact path="/courses/:id/update" component={UpdateCourse} />
		        <Route path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
		        <Route exact path="/signin" render={() => <UserSignIn />} />
                <Route exact path="/signup" render={() => <UserSignUp />} />
                <Route exact path="/signout" render={() => <UserSignOut />} />
		      </Switch>
		    </div>
		  </Router>
		)
	}
}