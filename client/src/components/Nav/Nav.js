import React, {Component} from "react";
import './Nav.css';

class Nav extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top">
        <a class="navbar-brand" href="/"><img id="logo-header"src="/images/Logo-top-left.gif" alt="recruit hound logo" />Recruit<span className="fontOrange">Hound</span></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="main-menu-links" href="#two">How It Works</a>
                </li>
                <li class="nav-item">
                    <a class="main-menu-links" href="/" data-toggle="modal" data-target="#myModal" id="showContactModal">Contact Us</a>
                </li>
                <li class="nav-item">
                    <a class="login-link" href="/signin">Sign In</a>
                </li>
            </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;
