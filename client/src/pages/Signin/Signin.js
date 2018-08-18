import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import $ from 'jquery';

class Signin extends Component {
  state = {
    username: '',
    password: '',
    redirectTo: null,
    error: null
  }

  handleChange = this.handleChange.bind(this);
  onHandleSubmit = this.onHandleSubmit.bind(this);

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onHandleSubmit(event) {
    event.preventDefault()
    console.log('Signin submit has fired!')
    $.ajax({
      url: '/api/signin',
      type: 'post',
      data: { 
        username: this.state.username, 
        password: this.state.password,
      },
      success: (response) => {
        console.log("Success!");
        console.log(response);
        this.props.updateUser({
          loggedIn: true,
          id: response.id,
          username: response.username,
          firstname: response.firstname,
          lastname: response.lastname,
          address1: response.address1,
          address2: response.address2,
          city: response.city,
          state: response.state,
          zip: response.zip,
          created: response.created,
          lastLogin: response.lastLogin
        })
        this.setState({
          redirectTo: '/user-dashboard'
        })
      },
      error: (err) => {
        this.setState({
          error: err.responseText
        })
      }
    });
  }

  render () {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
        return (
        <div>
          <Nav
            sitepath={this.props.sitepath}
            loggedIn={this.props.loggedIn}
            updateUser={this.props.updateUser}
          />

          <div className="signin-container">
            <div className="signin-content">
                <img id="logo-signin" src="/images/Logo-top-left.gif" alt="Logo-top-left.gif" />
              <div className="flex-item">
                <div className="container">
                  <div className="frontbox">
                    <div className="login">
                      <h2>SIGN IN</h2>
                      <h3>{this.state.error}</h3>
                      <form id="signin" name="signin" method="post" action="signin">
                        <div className="inputbox">
                          <input className="form-control" type="text" name="username" placeholder="EMAIL" required value={this.state.username} onChange={this.handleChange} autoComplete="email" />
                          <input className="form-control" type="password" name="password" placeholder="Password" required value={this.state.password} onChange={this.handleChange} autoComplete="current-password" />
                          <button className="btn" type="submit" id="btn-signin" value="Sign In" onClick={this.onHandleSubmit}>Submit</button>
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
}

export default Signin