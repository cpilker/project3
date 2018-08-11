import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard';

// import RecruiterDashboard from './pages/RecruiterDashboard';

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
