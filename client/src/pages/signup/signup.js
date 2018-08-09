import React, {Component} from "react";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import $ from 'jquery';

class Signup extends Component {
  state = {
    skills: ['C++', 'C#', 'Java', 'JavaScript', 'Perl', 'PHP', 'Python', 'Bootstrap', 'Handlebars', 'React', 'NodeJS', 'Angular', 'CSS', 'HTML'],
    errorMessage: "Placeholder message",
    statusMessage: "plcaeholder 2",
    username: '',
    newfirstname: '',
    newlastname: '',
    newaddress1: '',
    newaddress2: '',
    newcity: '',
    newstate: '',
    newzip: '',
    password: ''
  }

  handleOnChange = this.handleOnChange.bind(this);
  submitForm = this.submitForm.bind(this);

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  clearForm() {
    this.setState({
      username: '',
      newfirstname: '',
      newlastname: '',
      newaddress1: '',
      newaddress2: '',
      newcity: '',
      newstate: '',
      newzip: '',
      password: ''
    })
  }

  submitForm(e) {
    e.preventDefault();
    console.log("SubmitForm has been fired!");
    $.ajax({
      url: '/api/signup',
      type: 'post',
      data: { 
        username: this.state.username, 
        newfirstname: this.state.newfirstname,
        newlastname: this.state.newlastname,
        newaddress1: this.state.newaddress1,
        newaddress2: this.state.newaddress2,
        newcity: this.state.newcity,
        newstate: this.state.newstate,
        newzip: this.state.newzip,
        password: this.state.password,
      },
      success: (response) => {
        // this.clearForm()
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("Success!");
          console.log(response);
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  render () {
    return (
    <div>
      <Nav />
      <div id="signupbody">
          <section className="profile-container">
            <div className="profile-content">
              <div className="thumbnail" >
                <img id="logo-signin"src="./images/Logo-top-left.gif" alt="recruit hound logo"/>
              </div>
      
              <div className="profile-form">
                <form id="usersignup" name="signup">
                  <h2>CREATE A PROFILE</h2>
                    <h5 className="statusmessage">Error: {this.state.errorMessage}</h5>
                    <h5 className="statusmessage">{this.state.statusMessage}</h5>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input type="email" className="form-control" id="email" placeholder="Email" name="username" value={this.state.username} onChange={this.handleOnChange} required autoComplete="email"/>
                    </div>
                    <div className="form-group col-md-6">
                      <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleOnChange} required autoComplete="new-password" />
                    </div>
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
                  <div className="form-group">
                    <input type="text" className="form-control" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value={this.state.newaddress2} onChange={this.handleOnChange} autoComplete="address-line2" />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <input type="text" className="form-control" id="newcity" name="newcity" placeholder="City" value={this.state.newcity} onChange={this.handleOnChange} required autoComplete="address-level2" />
                    </div>
                    <div className="form-group col-md-4">
                      <select id="newstate" className="form-control" name="newstate" value={this.state.newstate} onChange={this.handleOnChange} required autoComplete="address-level1">
                        <option disabled>Choose...</option>
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
                    <div className="custom-file">
                      <input type="file" className="custom-file-input" id="newresume" name="newresume"/>
                      <label className="custom-file-label" htmlFor="newresume">Upload Resume</label>
                    </div>
                    <div className="form-group" id="skills-container">
                      <label id="technologiesWorkWith" htmlFor="skills-block">What technologies do you work with?</label>
                      <div className="btn-group-toggle" data-toggle="buttons" id="skills-block">
                          {/* //Begin list of skills */}
                          {this.state.skills}
                      </div>
                    </div>
                  </div>
                  <div className="form-row" id="submit-btn-container">
                    <input type="hidden" id="skill" name="skill" value=""/>
                    <button type="submit" className="btn btn-primary submitprofile" value="Create My Profile" onClick={this.submitForm}>Create My Profile</button>
                  </div>
                </form>
              </div>
            </div>
          </section>
          {/* <h1>{this.state.default}</h1> */}
      </div>
    <Footer/>
    </div>
    )
  }
}

export default Signup;