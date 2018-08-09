import React, {Component} from "react";
//import "./signin.css";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import $ from 'jquery';

class Signin extends Component {
  state = {
    default: "Hello World"
  }

  onHandleSubmit(event) {
    event.preventDefault()

  }

  render () {
    return (
      <div>
        <Nav />

        <div className="signin-container">
          <div className="signin-content">
              <img id="logo-signin" src="/images/Logo-top-left.gif" alt="Logo-top-left.gif" />
            <div className="flex-item">
              <div className="container">
                <div className="frontbox">
                  <div className="login">
                    <h2>SIGN IN</h2>
                    <form id="signin" name="signin" method="post" action="signin">
                      <div className="inputbox">
                        <input className="form-control" type="text" name="email" placeholder="EMAIL" required />
                        <input className="form-control" type="password" name="password" placeholder="Password" required />
                        <input className="btn" type="submit" id="btn-signin" value="Sign In" />
                        <a href="/">
                          <p>Forget Password?</p>
                        </a> 
                        <a href="/signup">
                          <p>New User? Create A Profile.</p>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Signin