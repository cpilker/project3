import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard';

// import RecruiterDashboard from './pages/RecruiterDashboard';

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
    loggedIn: false,
    created: null,
    lastLogin: null
  }

  updateUser = this.updateUser.bind(this);

  componentDidMount() {
    // this.getUser();
  }

  updateUser (userObject) {
    console.log("Update user has fired!");
    console.log(userObject)
    this.setState(userObject)
  }

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
                updateUser={this.updateUser}
              />}
            />
            <Route path='/signup' render={() =>
              <Signup
                updateUser={this.updateUser}
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
