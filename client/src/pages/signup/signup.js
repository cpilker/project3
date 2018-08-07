import React, {Component} from "react";
// import "./signup.css";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

class Signup extends Component {
  state = {
    default: "Hello World",
    skills: ['C++', 'C#', 'Java', 'JavaScript', 'Perl', 'PHP', 'Python', 'Bootstrap', 'Handlebars', 'React', 'NodeJS', 'Angular', 'CSS', 'HTML'],
    errorMessage: "Placeholder message",
    statusMessage: "plcaeholder 2"
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
                <form id="usersignup" name="signup" method="post" action="signup">
                  <h2>CREATE A PROFILE</h2>
                    <h5 class="statusmessage">Error: {this.state.errorMessage}</h5>
                    <h5 class="statusmessage">{this.state.statusMessage}</h5>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="email" class="form-control" id="newemail" placeholder="Email" name="newemail" required/>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="password" class="form-control" id="newpassword" placeholder="Password" name="newpassword" required/>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newfirstname" placeholder="Jane" name="newfirstname" required/>
                    </div>
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newlastname" placeholder="Smith" name="newlastname" required/>
                    </div>
                  </div>
                  <div class="form-group">    
                      <input type="text" class="form-control" id="newaddress1" placeholder="1234 Main St" name="newaddress1" required/>
                  </div>
                  <div class="form-group">
                    <input type="text" class="form-control" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2"/>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <input type="text" class="form-control" id="newcity" name="newcity" placeholder="City" required/>
                    </div>
                    <div class="form-group col-md-4">
                      <select id="newstate" class="form-control" name="newstate" required>
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
                      <input type="text" class="form-control" id="newzip" name="newzip" placeholder="Zip" required/>
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
                    <input type="submit" class="btn btn-primary submitprofile" value="Create My Profile"/>
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