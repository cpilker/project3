import React, {Component} from "react";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import $ from 'jquery';

class Signup extends Component {
  state = {
    skills: ['C++', 'C#', 'Java', 'JavaScript', 'Perl', 'PHP', 'Python', 'Bootstrap', 'Handlebars', 'React', 'NodeJS', 'Angular', 'CSS', 'HTML'],
    errorMessage: "Placeholder message",
    statusMessage: "plcaeholder 2",
    newemail: '',
    newfirstname: '',
    newlastname: '',
    newaddress1: '',
    newaddress2: '',
    newcity: '',
    newstate: '',
    newzip: '',
    newpassword: ''
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
    $.ajax({
      url: '/api/signup',
      type: 'post',
      data: { 
        newemail: this.state.newemail, 
        newfirstname: this.state.newfirstname,
        newlastname: this.state.newlastname,
        newaddress1: this.state.newaddress1,
        newaddress2: this.state.newaddress2,
        newcity: this.state.newcity,
        newstate: this.state.newstate,
        newzip: this.state.newzip,
        newpassword: this.state.newpassword,
      },
      success: () => {
        console.log("You did it!");
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
          <section class="profile-container">
            <div class="profile-content">
              <div class="thumbnail" >
                <img id="logo-signin"src="./images/Logo-top-left.gif" alt="recruit hound logo"/>
              </div>
      
              <div class="profile-form">
                <form id="usersignup" name="signup">
                  <h2>CREATE A PROFILE</h2>
                    <h5 class="statusmessage">Error: {this.state.errorMessage}</h5>
                    <h5 class="statusmessage">{this.state.statusMessage}</h5>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="email" class="form-control" id="newemail" placeholder="Email" name="newemail" value={this.state.newemail} onChange={this.handleOnChange} required/>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="password" class="form-control" id="newpassword" placeholder="Password" name="newpassword" value={this.state.newpassword} onChange={this.handleOnChange} required/>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newfirstname" placeholder="Jane" name="newfirstname" value={this.state.newfirstname}onChange={this.handleOnChange} required/>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newlastname" placeholder="Smith" name="newlastname" value={this.state.newlastname} onChange={this.handleOnChange} required/>
                    </div>
                  </div>
                  <div class="form-group">    
                      <input type="text" class="form-control" id="newaddress1" placeholder="1234 Main St" name="newaddress1" value={this.state.newaddress1} onChange={this.handleOnChange} required/>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value={this.state.newaddress2} onChange={this.handleOnChange}/>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newcity" name="newcity" placeholder="City" value={this.state.newcity} onChange={this.handleOnChange} required/>
                    </div>
                    <div class="form-group col-md-4">
                      <select id="newstate" class="form-control" name="newstate" value={this.state.newstate} onChange={this.handleOnChange} required>
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
                    <div class="form-group col-md-2">
                      <input type="text" class="form-control" id="newzip" name="newzip" placeholder="Zip" value={this.state.newzip} onChange={this.handleOnChange}required/>
                    </div>
                    <div class="custom-file">
                      <input type="file" class="custom-file-input" id="newresume" name="newresume"/>
                      <label class="custom-file-label" for="newresume">Upload Resume</label>
                    </div>
                    <div class="form-group" id="skills-container">
                      <label id="technologiesWorkWith" for="skills-block">What technologies do you work with?</label>
                      <div class="btn-group-toggle" data-toggle="buttons" id="skills-block">
                          {/* //Begin list of skills */}
                          {this.state.skills}
                      </div>
                    </div>
                  </div>
                  <div class="form-row" id="submit-btn-container">
                    <input type="hidden" id="skill" name="skill" value=""/>
                    <button type="submit" class="btn btn-primary submitprofile" value="Create My Profile" onClick={this.submitForm}>Create My Profile</button>
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