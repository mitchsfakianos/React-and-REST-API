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
/*import UserSignOut from './components/UserSignOut';*/

export default class App extends Component {
	render () {
		return (
		  <Router>
		    <div>
		      <Header />
		      <Switch>  
		        <Route exact path="/" render={() => <Courses />} />
		        <Route exact path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
		      </Switch>
		    </div>
		  </Router>
		)
	}
}