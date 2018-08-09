import React, {Component} from "react";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';


class UserDashboard extends Component {
  state = {
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

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render () {
    return (
      <div className="UserDashboard container">
      <Nav />
        <div className="row" id="portfolio_info">
          <div className="col-xs-12 col-md-4">
            <div className="thumbnail" id="profile_image">
              <img className='img-thumbnail' src="./images/army.jpg" alt="army.jpg" id="image_source" />
            </div>
          </div>
          <div className="col-xs-12 col-md-8">
            <div className="profile-form">
              <form id="useredit" name="edit" method="post" action="edit">
              <h2 id="editheader">Edit Profile</h2>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input type="email" className="form-control" id="editemail" placeholder="Email" name="username" value={this.state.username} onChange={this.handleOnChange} autoComplete="email" />
                </div>
                <div className="form-group col-md-6">
                  <input type="password" className="form-control" id="editpassword" placeholder="Password" name="newpassword" autoComplete="new-password" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input type="text" className="form-control" id="editfirstname" placeholder="Jane" name="firstname" value={this.state.firstname} onChange={this.handleOnChange} autoComplete="given-name" />
                </div>
                <div className="form-group col-md-6">
                  <input type="text" className="form-control" id="editlastname" placeholder="Smith" name="lastname" value={this.state.lastname} onChange={this.handleOnChange} autoComplete="family-name" />
                </div>
              </div>
              <div className="form-group">    
                <input type="text" className="form-control" id="editaddress1" placeholder="1234 Main St" name="address1" value={this.state.address1} onChange={this.handleOnChange} autoComplete="address-line1" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" id="editaddress2" placeholder="Apartment, studio, or floor" name="address2" value={this.state.address2} onChange={this.handleOnChange} autoComplete="address-line2" />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <input type="text" className="form-control" id="editcity" name="city" placeholder="City" value={this.state.city} onChange={this.handleOnChange} autoComplete="address-level2" />
                </div>
                <div className="form-group col-md-4">
                  <select id="editstate" className="form-control" name="state" value={this.state.state} onChange={this.handleOnChange} autoComplete="address-level1">
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
                  <input type="text" className="form-control" id="editzip" name="zip" placeholder="Zip" value={this.state.zip} onChange={this.handleOnChange} autoComplete="postal-code" />
                </div>
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="editresume" name="newresume" />
                  <label className="custom-file-label" htmlFor="editresume">Upload Resume</label>
                </div>
                <div className="form-group" id="skills-container">
                  <label id="skills" htmlFor="skills-block">What technologies do you work with?</label>
                  <div className="btn-group-toggle" data-toggle="buttons" id="skills-block">
                    {/* <!-- Begin list of skills --> */}
                  </div>
                </div>
              </div>
              <div className="form-row" id="save-btn-container">
                <input type="hidden" id="skill" name="skill" value="" />
                <input type="submit" className="btn btn-primary saveprofile" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>

      <hr />
      <div className="row" id='agency_info'>
      <h2 id='accordion-header'>Your Local Recruiters!</h2>

      <div className='col-xs-12 agency-locate'>
        <form className="form-row">
          <input className="form-control" type="text" id="search-input" placeholder="Enter Your City" />
          <button className="btn btn-primary" id="search-button">Search</button>
        </form>
      </div>
      </div>
      <div className="col-xs-12 recruiter-return-info" display-toggle="none">
        <div className="accordion" id="recruiterAccordion"></div>	
      </div>
      <Footer />
    </div>
    )
  }
}

export default UserDashboard;