import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';

const routes = [   // Define the various components that need to be rendered into an array
  { path: '/',
    exact: true,
    nav: () => <Nav />,
    home: () => <Home />,
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
