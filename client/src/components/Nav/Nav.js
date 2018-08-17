import React, {Component} from "react";
import './Nav.css';
import ContactUs from '../ContactUs';
import $ from 'jquery';


class Nav extends Component {
  state = {
    default: "Hello World",
  }

  signout = this.signout.bind(this);

  signout() {
    $.ajax({
      url: '/api/signout',
      type: 'get',
      success: (response) => {
        // this.clearForm()
        if (response.err) {
          console.log("Signout Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("Signout response:");
          console.log(response);
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  render () {
      console.log(this.props.sitepath)
    return (
        <div>
      <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top">
        <a className="navbar-brand" href="/"><img id="logo-header"src="/images/Logo-top-left.gif" alt="recruit hound logo" />Recruit<span className="fontOrange">Hound</span></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              {this.props.sitepath == "index" ? 
                <li className="nav-item">
                  <a className="main-menu-links" href="#two">How It Works</a>
                </li>
                : ""
              }
                <li className="nav-item">
                  <a className="main-menu-links" href="" data-toggle="modal" data-target="#myModal" id="showContactModal">Contact Us</a>
                </li>
              {this.props.sitepath == "user-dashboard" && this.props.loggedIn ? 
                <li className="nav-item">
                  <button className="logout-link" onClick={this.signout}>Sign Out</button>
                </li>
                :
                <li className="nav-item">
                  <a className="login-link" href="/signin">Sign In</a>
                </li>
              }
            </ul>
        </div>
      </nav>
        <div>
            <ContactUs />
        </div>
      </div>
    )
  }
}

export default Nav;
