import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard';
// import RecruiterDashboard from './pages/RecruiterDashboard';
import $ from 'jquery';

class App extends Component {
  state = {
    username: null,
    loggedIn: false
  }

  updateUser = this.updateUser.bind(this);

  componentDidMount() {
    // this.getUser();
  }

  updateUser (userObject) {
    console.log("Update user has fired!");
    this.setState(userObject)
  }

  // getUser() {
  //   $.ajax({
  //     url: '/api/getuser',
  //     type: 'get',
  //     data: { 
  //       username: this.state.username, 
  //       newfirstname: this.state.newfirstname,
  //       newlastname: this.state.newlastname,
  //       newaddress1: this.state.newaddress1,
  //       newaddress2: this.state.newaddress2,
  //       newcity: this.state.newcity,
  //       newstate: this.state.newstate,
  //       newzip: this.state.newzip,
  //       password: this.state.password,
  //     },
  //     success: (response) => {
  //       // this.clearForm()
  //       if (response.err) {
  //         console.log("Error!");
  //         console.log(response.err);
  //         this.setState({
  //           errorMessage: response.err.message
  //         })
  //       } else {
  //         console.log("Success!");
  //         console.log(response);
  //         this.setState({
  //           redirectTo: '/user-dashboard'
  //         })
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' render={() =>
            <Signin
              username={this.state.username}
              loggedIn={this.state.loggedIn}
            />}
          />
            <Route path='/signup' render={() =>
              <Signup
                updateUser={this.updateUser}
              />}
            />
            <Route path='/user-dashboard' render={() =>
              <UserDashboard
                username={this.state.username}
                loggedIn={this.state.loggedIn}
              />}
            />
            {/* <Route path='/recruiterdashboard' component={RecruiterDashboard} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
