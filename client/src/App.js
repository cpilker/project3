import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import RecruiterSignup from './pages/RecruiterSignup';
import $ from 'jquery';

class App extends Component {
  state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    loggedIn: null,
    created: null,
    lastLogin: null,
  }

  updateUser = this.updateUser.bind(this);

  componentDidMount() {
    $.ajax({   // Load currently signed in user, if exists
      url: '/api/getuser',
      type: 'get',
      success: (response) => {
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("@route GET /api/getuser response:");
          console.log(response);
          this.setState(response)   // Set state to current user
          this.setState({loggedIn: true})
        }
      },
      error: (err) => {
        console.log(err);
        this.setState({
          errorMessage: err.statusText
        })
      }
    });
  }


  updateUser (userObject) {
    console.log("Update user has fired!");
    console.log(userObject)
    this.setState(userObject)
  }

  render() {
    console.log(this.state.loggedIn);
    return (
      <Router>
          <Switch>
            <Route exact path='/' render={() =>
              <Home
                sitepath={"index"}
                loggedIn={this.state.loggedIn}
              />} 
            />
            <Route path='/signin' render={() =>
              <Signin
                username={this.state.username}
                loggedIn={this.state.loggedIn}
                updateUser={this.updateUser}
                sitepath={"signin"}
              />}
            />
            <Route path='/signup' render={() =>
              <Signup
                updateUser={this.updateUser}
                sitepath={"signup"}
                loggedIn={this.state.loggedIn}
              />}
            />
            <Route path='/user-dashboard' render={() =>
              <UserDashboard
                id={this.state.id}
                username={this.state.username}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                address1={this.state.address1}
                address2={this.state.address2}
                city={this.state.city}
                state={this.state.state}
                zip={this.state.zip}
                loggedIn={this.state.loggedIn}
                updateUser={this.updateUser}
                sitepath={"user-dashboard"}
              />}
            />
            <Route path='/recruiterdashboard' render={() =>
              <RecruiterDashboard
                company={this.state.company}
                firstname={this.state.firstname}
                lastname={this.state.lastname}
                username={this.state.username}
                password={this.state.password}
                address1={this.state.address1}
                address2={this.state.address2}
                city={this.state.city}
                state={this.state.state}
                zip={this.state.zip}
                phone={this.state.phone}
                sitepath={"recruiterdashboard"}
                loggedIn={this.state.loggedIn}
                updateUser={this.updateUser}
              />}
            />
            <Route path='/recruitersignup' render={() =>
              <RecruiterSignup
                updateUser={this.updateUser}
                sitepath={"recruitersignup"}
                loggedIn={this.state.loggedIn}
              />}
            />
          </Switch>
      </Router>
    );
  }
}

export default App;
