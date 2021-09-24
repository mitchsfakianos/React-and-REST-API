import './styles/global.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './components/Context/index.js'
import Courses from './components/courses.js';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import Header from './components/Header';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {
				id: '',
				firstName: '',
				lastName: '',
				emailAddress: '',
				password: '',
				auth: '',
				isAuthenticated: false
			}
		};

		this.signIn = this.signIn.bind(this);
    	this.signOut = this.signOut.bind(this);
	}

	// the sign in method gets the user route and checks if it matches with the information provided, then saves the users info in the global state
	signIn(emailAddress, password) {
		let h = new Headers();
		h.append('Accept', 'application/json');
		h.append('Content-Type', 'application/json');
		let encoded = window.btoa(`${emailAddress}:${password}`) // this was my solution for the authorization, so this encoded value is passed around through different pages for when it is required
		let auth = 'Basic ' + encoded;
		h.append('Authorization', auth);

		fetch("http://localhost:5000/api/users", {
	      method: "GET",
	      mode: 'cors',
	      headers: h,
	      auth: {
	      	username: emailAddress,
	      	password: password
	      }
	    })
	    .then(res=> {
	    	if (res.status === 200) {
	    	  res.json().then(data => 
		          this.setState({
			        user: {
			          id: data.id,
			          firstName: data.firstName,
			          lastName: data.lastName,
			          emailAddress: data.emailAddress,
			          password: data.password,
			          auth: encoded,
			          isAuthenticated: true
			        }
			      }) 
	    	  );
	    	} 
	    })
	    .catch((err) => {
		    console.log(err);
	    })
	}

	// the sign out method empties out the values for the global user state
	signOut() {
		this.setState(
	      {
	        user: {
	          id: '',
	          firstName: '',
	          lastName: '',
	          emailAddress: '',
	          password: '',
	          auth: '',
	          isAuthenticated: false
	        }
	      });
	}

	render () {
		return (
		  <Provider value={{
		  	state: this.state.user,
		  	signin: this.signIn,
		  	signout: this.signOut
		  }}>
			  <Router>
			    <div>
			      <Header />
			      <Switch>  
			        <Route exact path="/" render={() => <Courses />} />
			        <PrivateRoute exact path="/courses/create" component={CreateCourse} user={this.state.user}/>
			        <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
			        <Route path="/courses/:id" render={(props) => <CourseDetail {...props} />} />
			        <Route exact path="/signin" render={() => <UserSignIn signIn={this.signIn}/>} />
		            <Route exact path="/signup" render={() => <UserSignUp signIn={this.signIn}/>} />
		            <Route path="/signout" render={() => <UserSignOut signOut={this.signOut}/>} />
			      </Switch>
			    </div>
			  </Router>
		  </Provider>
		)
	}
}