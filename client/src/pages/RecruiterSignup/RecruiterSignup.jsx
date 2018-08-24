import React, {Component, Fragment} from "react";
import { Redirect } from 'react-router-dom';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import styles from './RecruiterSignup.css';
import $ from 'jquery';

// To Do: combine this into a single component with Signup, pass variable that detects recruiter or user and fire appropriate post route

class Signup extends Component {
  state = {
    errorMessage: undefined,
    newcompany: undefined,
    newfirstname: undefined,
    newlastname: undefined,
    username: undefined,
    password: undefined,
    newaddress1: undefined,
    newaddress2: undefined,
    newcity: undefined,
    newstate: undefined,
    newzip: undefined,
    newphone: undefined,
    redirectTo: null
  }

  handleOnChange = this.handleOnChange.bind(this);
  submitForm = this.submitForm.bind(this);

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  submitForm(e) {
    e.preventDefault();
    console.log("SubmitForm has been fired!");
    const data = {
      newcompany: this.state.newcompany,
      username: this.state.username,
      newfirstname: this.state.newfirstname,
      newlastname: this.state.newlastname,
      newaddress1: this.state.newaddress1,
      newaddress2: this.state.newaddress2,
      newcity: this.state.newcity,
      newstate: this.state.newstate,
      newzip: this.state.newzip,
      password: this.state.password
    }
    $.ajax({
      url: '/api/recruitersignup',
      type: 'post',
      data: data,
      success: (response) => {
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("Success!");
          console.log(response);
          this.props.updateUser({
            loggedIn: true,
            username: response.username
          })
          this.setState({
            redirectTo: '/recruiterdashboard'
          })
        }
      },
      error: (err) => {
        this.setState({
          errorMessage: err
        })
        console.log(err);
      }
    });
  }

  render () {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <Fragment>
        <Nav
          sitepath={this.props.sitepath}
          loggedIn={this.props.loggedIn}
          updateUser={this.props.updateUser}
        />
        <div className={styles.signupContainer}>
          <div className={styles.signupContent}>
            <div id="signupbody">
                <section className="profile-container">
                  <div className="profile-content">
                    <div className="thumbnail" >
                      <img className={styles.logoSignup} src="./images/Logo-top-left.gif" alt="recruit hound logo"/>
                    </div>
            
                    <div className="profile-form">
                      <form id="usersignup" name="signup">
                        <h2>CREATE A PARTNER ACCOUNT</h2>
                        <p className="error-text">{this.state.errorMessage ? `Error: ${this.state.errorMessage}` : ""}</p>
                        <div className="form-row" className="signup-candidate-link-top">
                          <a href="/signup">Job Candidate? Sign Up Here!</a>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input type="email" className="form-control" id="email" placeholder="Email" name="username" value={this.state.username} onChange={this.handleOnChange} required autoComplete="email"/>
                          </div>
                          <div className="form-group col-md-6">
                            <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleOnChange} required autoComplete="new-password" />
                          </div>
                        </div>
                        <div className="form-group">    
                          <input type="text" className="form-control" id="newcompany" placeholder="Acme Recruiting Agency" name="newcompany" value={this.state.newcompany} onChange={this.handleOnChange} required autoComplete="org" />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="newfirstname" placeholder="Jane" name="newfirstname" value={this.state.newfirstname}onChange={this.handleOnChange} required autoComplete="given-name" />
                          </div>
                          <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="newlastname" placeholder="Smith" name="newlastname" value={this.state.newlastname} onChange={this.handleOnChange} required autoComplete="family-name" />
                          </div>
                        </div>
                        <div className="form-group">    
                            <input type="text" className="form-control" id="newaddress1" placeholder="1234 Main St" name="newaddress1" value={this.state.newaddress1} onChange={this.handleOnChange} required autoComplete="address-line1" />
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value={this.state.newaddress2} onChange={this.handleOnChange} autoComplete="address-line2" />
                          </div>
                          <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="newphone" placeholder="999-555-1212" name="newphone" value={this.state.newphone} onChange={this.handleOnChange} autoComplete="tel" />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group col-md-6">
                            <input type="text" className="form-control" id="newcity" name="newcity" placeholder="City" value={this.state.newcity} onChange={this.handleOnChange} required autoComplete="address-level2" />
                          </div>
                          <div className="form-group col-md-4">
                            <select id="newstate" className="form-control" name="newstate" value={this.state.newstate} onChange={this.handleOnChange} required autoComplete="address-level1">
                              <option selected disabled>Choose...</option>
                              <option value="AL">Alabama</option>
                              <option value="AK">Alaska</option>
                              <option value="AZ">Arizona</option>
                              <option value="AR">Arkansas</option>
                              <option value="CA">California</option>
                              <option value="CO">Colorado</option>
                              <option value="CT">Connecticut</option>
                              <option value="DE">Delaware</option>
                              <option value="DC">District Of Columbia</option>
                              <option value="FL">Florida</option>
                              <option value="GA">Georgia</option>
                              <option value="HI">Hawaii</option>
                              <option value="ID">Idaho</option>
                              <option value="IL">Illinois</option>
                              <option value="IN">Indiana</option>
                              <option value="IA">Iowa</option>
                              <option value="KS">Kansas</option>
                              <option value="KY">Kentucky</option>
                              <option value="LA">Louisiana</option>
                              <option value="ME">Maine</option>
                              <option value="MD">Maryland</option>
                              <option value="MA">Massachusetts</option>
                              <option value="MI">Michigan</option>
                              <option value="MN">Minnesota</option>
                              <option value="MS">Mississippi</option>
                              <option value="MO">Missouri</option>
                              <option value="MT">Montana</option>
                              <option value="NE">Nebraska</option>
                              <option value="NV">Nevada</option>
                              <option value="NH">New Hampshire</option>
                              <option value="NJ">New Jersey</option>
                              <option value="NM">New Mexico</option>
                              <option value="NY">New York</option>
                              <option value="NC">North Carolina</option>
                              <option value="ND">North Dakota</option>
                              <option value="OH">Ohio</option>
                              <option value="OK">Oklahoma</option>
                              <option value="OR">Oregon</option>
                              <option value="PA">Pennsylvania</option>
                              <option value="RI">Rhode Island</option>
                              <option value="SC">South Carolina</option>
                              <option value="SD">South Dakota</option>
                              <option value="TN">Tennessee</option>
                              <option value="TX">Texas</option>
                              <option value="UT">Utah</option>
                              <option value="VT">Vermont</option>
                              <option value="VA">Virginia</option>
                              <option value="WA">Washington</option>
                              <option value="WV">West Virginia</option>
                              <option value="WI">Wisconsin</option>
                              <option value="WY">Wyoming</option>
                            </select>
                          </div>
                          <div className="form-group col-md-2">
                            <input type="text" className="form-control" id="newzip" name="newzip" placeholder="Zip" value={this.state.newzip} onChange={this.handleOnChange} required autoComplete="postal-code" />
                          </div>
                          {/* <div className="custom-file">
                            <input type="file" className="custom-file-input" name="file" id="file" onChange={this.handleOnChange} />
                            <label className="custom-file-label" htmlFor="newresume">Upload Resume</label>
                          </div> */}
                          {/* <div className="form-group" id="skills-container">
                            <label id="technologiesWorkWith" htmlFor="skills-block">What technologies do you work with?</label>
                            <div className="btn-group-toggle" data-toggle="buttons" id="skills-block">
                                {this.state.skills}
                            </div>
                          </div> */}
                        </div>
                        <div className="form-row" id="submit-btn-container">
                          <button type="submit" className="btn btn-primary submitprofile" value="Create My Profile" onClick={this.submitForm}>Create My Profile</button>
                        </div>
                        <div className="form-row" className="signup-candidate-link-bottom">
                          <a href="/signup">Job Candidate? Sign Up Here!</a>
                        </div>
                      </form>
                    </div>
                  </div>
                </section>
                {/* <h1>{this.state.default}</h1> */}
              </div>
            </div>
          </div>

        <div className={styles.footerRow}>
          <Footer/>
        </div>
      </Fragment>
      )
    }
  }
}

export default Signup;
