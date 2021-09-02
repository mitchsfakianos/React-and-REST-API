import './styles/global.css';
import React, {Component} from 'react';
import Courses from './components/courses';
/*import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';
*/
export default class App extends Component {
	render () {
		return (
		  <Courses/>
		)
	}
}