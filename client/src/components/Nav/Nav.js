import React, {Component, Fragment} from "react";
import './Nav.css';
import ContactUs from '../ContactUs';
import $ from 'jquery';


class Nav extends Component {
  state = {
    default: "Hello World",
  }

  signout = this.signout.bind(this);

  signout() {
    console.log("Signout ajax get has been fired!");
    $.ajax({
      url: '/api/signout',
      type: 'get',
      success: (response) => {
        console.log(response)
        // this.clearForm()
        if (response.err) {
          console.log("Signout Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          this.props.updateUser({
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
            created: null
          })   // Stores logged in status in App.js
          console.log("Redirecting now...")
          window.location.assign('/')
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  render () {
      console.log(this.props.sitepath)
      console.log(`Logged in? ${this.props.loggedIn}`)
    return (
        <Fragment>
      <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top">
        <img id="logo-header"src="/images/Logo-top-left.gif" alt="recruit hound logo" /><a className="navbar-brand" href="/">Recruit<span className="fontOrange">Hound</span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {this.props.sitepath === "index" ? 
                <li className="nav-item">
                  <a className="main-menu-links" href="#what-we-do-title">How It Works</a>
                </li>
                : ""
              }
                <li className="nav-item">
                  <a className="main-menu-links" href="" data-toggle="modal" data-target="#myModal" id="showContactModal">Contact Us</a>
                </li>
              {this.props.loggedIn ? 
                <li className="nav-item">
                  <a className="logout-link" href="#" onClick={this.signout}>Sign Out</a>
                </li>
                :
                this.props.sitepath === "recruitersignup" ?
                  <Fragment>
                    <li className="nav-item">
                      <a className="main-menu-links" href="/signup">Candidates</a>
                    </li>
                    <li className="nav-item">
                      <a className="login-link" href="/signin">Sign In</a>
                    </li>
                  </Fragment>
                  :
                  <Fragment>
                    <li className="nav-item">
                      <a className="main-menu-links" href="/recruitersignup">Recruiters</a>
                    </li>
                    <li className="nav-item">
                      <a className="login-link" href="/signin">Sign In</a>
                    </li>
                  </Fragment>
              }
            </ul>
        </div>
      </nav>
        <div>
            <ContactUs />
        </div>
      </Fragment>
    )
  }
}

export default Nav;
