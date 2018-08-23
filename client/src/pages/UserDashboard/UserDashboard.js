import React, {Component} from "react";
import './UserDashboard.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
// import EventBrite from '../../components/Eventbrite';
import ProfilePic from '../../components/ProfilePic'
import Resume from '../../components/Resume'
import events from './eventbrite.json';
import $ from "jquery";
import RecruiterGrid from '../../components/RecruiterTile/RecruiterGrid';
import EventBriteGrid2 from '../../components/Eventbrite/EventBriteGrid2';
import skillsArray from '../../skills.json';
// import API from "../../utils/API";



class UserDashboard extends Component {
  state = {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    address1: null,
    address2: null,
    city: null,
    state: null,
    zip: null,
    // loggedIn: false,
    created: null,
    lastLogin: null,
    newusername: undefined,
    newfirstname: undefined,
    newlastname: undefined,
    newaddress1: undefined,
    newaddress2: undefined,
    newcity: undefined,
    newstate: undefined,
    newzip: undefined,
    newpassword: undefined,
    newlastLogin: undefined,
    errorMessage: null,
    statusText: null,
    events,
    recruitersearch: null,      
    skillsArray  
  }

  handleOnChange = this.handleOnChange.bind(this);
  saveProfile = this.saveProfile.bind(this);
  searchRecruiters = this.searchRecruiters.bind(this);
  // updateProfilePic = this.updateProfilePic.bind(this);

  componentDidMount(){
    this.setState({
      id: null,
      username: null,
      firstname: null,
      lastname: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
      // loggedIn: false,
      created: null,
      lastLogin: null,
    })
    
    $.ajax({   // To Do: make sure this fires after signin post has already finished, otherwise req.session.passport will not exist yet
      url: '/api/getuser',
      type: 'get',
      success: (response) => {
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("@route GET /api/getuser response:");
          console.log(response);
          this.props.updateUser(response)   // Stores current user in App.js
          this.props.updateUser({loggedIn: true})   // Stores logged in status in App.js
          this.setState(response)   // Set state to current user
        }
      },
      error: (err) => {
        console.log(err);
        this.setState({
          errorMessage: err.statusText
        })
      }
    });

  }

  handleOnChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  saveProfile(e) {
    e.preventDefault();
    console.log("updateProfile has been fired!");
    const data = {
      id: this.state.id,
      newusername: this.state.newusername === undefined ? this.props.username : this.state.newusername,
      newfirstname: this.state.newfirstname === undefined ? this.props.firstname : this.state.newfirstname,
      newlastname: this.state.newlastname === undefined ? this.props.lastname : this.state.newlastname,
      newaddress1: this.state.newaddress1 === undefined ? this.props.address1 : this.state.newaddress1,
      newaddress2: this.state.newaddress2 === undefined ? this.props.address2 : this.state.newaddress2,
      newcity: this.state.newcity === undefined ? this.props.city : this.state.newcity,
      newstate: this.state.newstate === undefined ? this.props.state : this.state.newstate,
      newzip: this.state.newzip === undefined ? this.props.zip : this.state.newzip,
      newpassword: this.state.newpassword
    }
    $.ajax({
      url: '/api/update-user-profile',
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
          this.props.updateUser(response)   // Stores current user in App.js
          this.props.updateUser({loggedIn: true})   // Stores logged in status in App.js
          this.setState(response)   // Set state to current user
          this.setState({statusText: "Success!"})
          this.editProfileButton();
        }
      },
      error: (err) => {
        console.log(err);
        this.setState({
          errorMessage: err.statusText
        })
      }
    });

  }

  searchRecruiters(e){
    e.preventDefault();
    let cityInput = $('#search-input').val()
    let city = cityInput.charAt(0).toUpperCase() + cityInput.slice(1);
    console.log(city)
    $.ajax({
      url: '/recruitersearch',
      type: 'get',
      data: {
        city: city
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
          this.setState({
            recruitersearch: response.response
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  editProfileButton(event){
    $('#user').find('.hider').each(function() {
      $(this).toggleClass('hidden');
    });
    $('#editprofile').text(function(i, text){   // Toggle Edit button text
      return text === "Edit Profile" ? "Cancel" : "Edit Profile";
    });
  }

  render () {
    console.log(this.state.id)
    return (
      <div className="UserDashboard">

      <Nav
        updateUser={this.props.updateUser}
        sitepath={this.props.sitepath}
        loggedIn={this.props.loggedIn}
      />

      {/* Orange Bar */}
      <div id="orangeBar">
        <span id="dashboardTitle">User Dashboard</span>
        <div id="orangeBarDogDiv">
          <img src="./images/dog-dashboard.png" id="orangeBarDogImg"/>
        </div>
      </div>
      <div className="clearfix" />
      {/* <h4>Logged In? = {this.props.loggedIn.toString()}</h4> */}


      <div className="container">
        <div className="row">

              
      <div className="col-xs-12 col-sm-12 col-md-3 gutterWrap text-center"> 
        <div className="paperCard" id="userProfile">

          <ProfilePic 
            id={this.state.id} 
            firstname={this.props.firstname} 
            lastname={this.props.lastname}
          />

          {/* User's Name */}
          <h3>{this.props.firstname} {this.props.lastname}</h3>

          {/* User Image */}
          <img src="https://pbs.twimg.com/profile_images/1002272769352978433/9S4QWSR0_400x400.jpg" id="userImage" />

          <div className="clearfix"/>

          {/* Edit button */}
          <button className="btn btn-primary" id="editProfile" onClick={this.editProfileButton}>Edit Profile</button><br />

          {/* Begin profile form */}
          <div >
          <form id="user" name="user-dashboard">
      
              <div className="form-row">
                  {/* E-mail */}
                  <div className="form-group col-md-12">
                      <label htmlFor="username"><strong>E-mail:</strong><br/>{this.props.username}</label>
                      <input type="email" className="form-control hidden hider" id="email" placeholder="Email" name="newusername" value={this.state.newusername} onChange={this.handleOnChange} required autoComplete="email"/>
                  </div>
                  {/* Password */}
                  <div className="form-group col-md-12">
                      <label htmlFor="password" className="formSpacer hidden hider"><strong>Password:</strong></label>
                      <input type="password" className="form-control hidden hider" id="password" placeholder="Password" name="newpassword" value={this.state.newpassword} onChange={this.handleOnChange} required autoComplete="new-password" />
                  </div>
              </div>

              <div className="form-row">
                  {/* First Name */}
                  <div className="form-group col-md-12">
                      <label htmlFor="newfirstname" className="formSpacer"><strong>First Name:</strong> {this.props.firstname}</label>
                      <input type="text" className="form-control hidden hider" id="newfirstname" placeholder="First name" name="newfirstname" value={this.state.newfirstname} onChange={this.handleOnChange} required autoComplete="given-name" />
                  </div>
                  {/* Last Name */}
                  <div className="form-group col-md-12">
                      <label htmlFor="newlastname" className="formSpacer"><strong>Last Name:</strong> {this.props.lastname}</label>
                      <input type="text" className="form-control hidden hider" id="newlastname" placeholder="Last name" name="newlastname" value={this.state.newlastname} onChange={this.handleOnChange} required autoComplete="family-name" />
                  </div>
              </div>

                  {/* Address */}
              <div className="form-group">  
                  <label htmlFor="newaddress1" className="formSpacer"><strong>Address:</strong> {this.props.address1}<br/>{this.props.address2}</label>
                  <input type="text" className="form-control hidden hider" id="newaddress1" placeholder="1234 Main St" name="newaddress1" value={this.state.newaddress1} onChange={this.handleOnChange} required autoComplete="address-line1" />
              </div>

              <div className="form-group">
                  {/* <label htmlFor="newaddress2" className="formSpacer hidden hider"><strong>Address 2:</strong> {this.props.address2}</label> */}
                  <input type="text" className="form-control hidden hider" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value={this.state.newaddress2} onChange={this.handleOnChange} autoComplete="address-line2" />
              </div>

              <div className="form-row">
                  {/* City */}
                  <div className="form-group col-md-7">
                      <label htmlFor="newcity" className="formSpacer"><strong>City:</strong> {this.props.city}</label>
                      <input type="text" className="form-control hidden hider" id="newcity" name="newcity" placeholder="City" value={this.state.newcity} onChange={this.handleOnChange} required autoComplete="address-level2" />
                  </div>
                  {/* State */}
                  <div className="form-group col-md-5">
                      <label htmlFor="newstate" className="formSpacer"><strong>State:</strong> {this.props.state}</label>
                      <select id="newstate" className="form-control hidden hider" name="newstate" value={this.state.newstate} onChange={this.handleOnChange} required autoComplete="address-level1">
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
                  {/* Zip Code */}
                  <div className="form-group col-md-12">
                      <label htmlFor="newzip" className="formSpacer"><strong>Zip Code:</strong> {this.props.zip}</label>
                      <input type="text" className="form-control hidden hider" id="newzip" name="newzip" placeholder="Zip" value={this.state.newzip} onChange={this.handleOnChange} required autoComplete="postal-code" />
                  </div>
                  {/* Skills */}
                  <div className="form-group col-md-12" id="skills-container">
                      <label id="technologiesWorkWith" htmlFor="skills-block" className="formSpacer"><strong>What technologies do you work with?</strong></label>
                      <div className="btn-group-toggle" data-toggle="buttons" id="skills-block">
                          {/* //Begin list of skills */}
                          {this.state.skillsArray.map(skill => (
                            <label className="btn btn-default skillbutton">
                            <input type="checkbox" autoComplete="off" value={skill.name} />
                            {skill.name}</label>
                          ))}
                      </div>
                  </div>
              </div>

              {/* Submit Button */}
              <div className="form-row" id="submit-btn-container">
                  <input type="hidden" id="skill" name="skill" value=""/>
                  <button type="submit" className="btn btn-primary submitprofile hidden hider" value="Create My Profile" onClick={this.saveProfile}>Save</button>
              </div>
          </form>


          <Resume
            id={this.state.id} 
            firstname={this.props.firstname} 
            lastname={this.props.lastname}
          />


          </div>
        </div>
        </div>


{/* Recruiter Grid */}
        <div className="paperCard col-md-9" id='agencyInfo'>
        <div className="row">
          <div className="col-md-12 col-lg-6 col-xl-6" id="recSearchTitle">
            <h2>&nbsp;Your Local Recruiters</h2>
          </div>

          <div className='col-xs-12 col-md-12 col-lg-6 col-xl-6' id="agencyLocate">
            <form className="form-row">
              <input className="form-control" type="text" id="search-input" placeholder="Enter Your City" />
              <button className="btn btn-primary" id="search-button" onClick={this.searchRecruiters}>Search</button>
            </form>
          </div>
          </div>
        

        <RecruiterGrid gridData={JSON.stringify(this.state.recruitersearch)}/>

        </div>

      <hr/>

{/* Events Table */}
      <div className="paperCard col-md-12" id="eventsCard">
        <h2>&nbsp;Events in Your Area</h2>
        <EventBriteGrid2 gridData={this.state.events} />
      </div>

      {/* <div className="row" id='events'>
        <h2 id='accordion-header'>Events in Your Area!</h2>
        <div className="container">
        <div className="cards">
        {this.state.events.map(event => (
          <EventBrite
          key={event.id}
          id={event.id}
          image={event.image}
          event={event.event}
          description={event.description}
          location={event.location}
          street={event.street}
          city={event.city}
          state={event.state}
          zipcode={event.zipcode}
          date={event.date}
          url={event.url}
        />
        ))}
        </div>
        </div>
      </div> */}




      <Footer />
    </div>
    </div>
    </div>


    )
  }
}

export default UserDashboard;