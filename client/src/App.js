import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/signup';
import Signin from '.pages/signin';
import Nav from './components/Nav';
import Footer from './components/Footer';

const routes = [   // Define the various components that need to be rendered into an array
  { path: '/',
    exact: true,
    nav: () => <Nav />,
    home: () => <Home />,
    footer: () => <Footer />
  },
  {
    path: '/signup',
    exact: true,
    nav: () => <Nav />,
    signup: () => <Signup />,
    footer: () => <Footer />
  },
  {
    path: '/signin',
    exact: true,
    nav: () => <Nav />,
    signin: () => <Signin />,
    footer: () => <Footer />
  }
]

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header>
            {routes.map((route, index) => (   // Access the routes array from above and render the Nav component
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.nav}
                />
            ))}
            {routes.map((route, index) => (   // Access the routes array from above and render the Home component
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.home}
              />
            ))}
            {routes.map((route, index) => (   // Access the routes array from above and render the Signup component
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.signup}
              />
            ))}
            {routes.map((route, index) => (   // Access the routes array from above and render the signin component
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.signin}
              />
            ))}
          </header>
          <footer className="footer text-center">
            {routes.map((route, index) => (   // Access the routes array from above and render the Home component
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.footer}
              />
            ))}
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
