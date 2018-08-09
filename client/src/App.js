import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import UserDashboard from './pages/UserDashboard';
// import RecruiterDashboard from './pages/RecruiterDashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/signup' component={Signup} />
            <Route path='/user-dashboard' component={UserDashboard} />
            {/* <Route path='/recruiterdashboard' component={RecruiterDashboard} /> */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
