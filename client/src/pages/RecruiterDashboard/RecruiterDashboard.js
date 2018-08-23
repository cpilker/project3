import React, {Component} from "react";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import $ from "jquery";
import UserTile from "../../components/UserTile/UserTile";
import PopulationTile from '../../components/PopulationTile/PopulationTile';
import './RecruiterDashboard.css';



class RecruiterDashboard extends Component {
  state = {
    default: "Hello World",
    users: '',
    availableusers: '',
    activeusers: '',
    opentoopportunities: '',
    notsearching: '',
    newusername: undefined,
    newfirstname: undefined,
    newlastname: undefined,
    newaddress1: undefined,
    newaddress2: undefined,
    newcity: undefined,
    newstate: undefined,
    newzip: undefined,
    newpassword: undefined
  }

  searchUsers = this.searchUsers.bind(this)

  componentDidMount(){
    this.pullUsers();
    this.pullActiveSearch();
    this.notSearching();
    this.openToOpportunities();
    this.searchUsers();
  }
  //This is to pull the users on the page loading (Total Active Users)
  pullUsers(e) {
    $.ajax({
      url: '/allusersavailable',
      type: 'get',
      success: (response) => {
        // this.clearForm()
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("Success at pulling all users on click (no filter or parameters)!");
          console.log(response.count + " Recruits available for contact");
          this.setState({
            availableusers: response.count
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveUser(e) {
    e.preventDefault();
    $.ajax({
      url: '/saveuser',
      type: 'post',
      data: {
        saveUser: this.val()
      },
      success: (response) => {
        if (response.err) {
          console.log("error on saving User");
          console.log(response.err);
        }
        else {
          console.log("Success at saving this user!!");
          console.log(response)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  //This is to pull users that are actively searching for a job
  pullActiveSearch(e) {
    $.ajax({
      url: '/activesearch',
      type: 'get',
      data: {
        jobSearchStatus: "Actively Searching"
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
          console.log("Success for Active Searchers");
          console.log(response.count + " Recruits looking for a job");
          this.setState({
            activeusers: response.count
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  //THis is to pull users that are OPEN TO OPPORTUNITIES
  openToOpportunities(e){
    $.ajax({
      url: '/opentoopportunities',
      type: 'get',
      data: {
        jobSearchStatus: "Open to Opportunities"
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
          console.log("Success for pulling those open to opportunities");
          console.log(response.count +" Recruits open to opportunities");
          this.setState({
            opentoopportunities: response.count
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  //This is to pull users that are not currently in the job market
  notSearching(e) {
    $.ajax({
      url: '/notsearching',
      type: 'get',
      data: {
        jobSearchStatus: "Not Searching"
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
          console.log("Success for pulling those not looking for a job");
          console.log(response.count + " Recruits not searching for a job");
          this.setState({
            notsearching: response.count
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  //This is to search for Users by City
  searchUsers(e){
    // e.preventDefault();
    $.ajax({
      url: '/usersearch',
      type: 'get',
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
          console.log(response.response)
          this.setState({
            users: response.response
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  
  

  render () {
    return (

      <div className="RecruiterDashboard">
            
      <Nav
        sitepath={this.props.sitepath}
        loggedIn={this.props.loggedIn}
        updateUser={this.props.updateUser}
      />

{/* Orange Bar */}
      <div id="recOrangeBar">
        <span id="recDashboardTitle">Recruiter Dashboard</span>
        <div id="recOrangeBarDogDiv">
          <img src="./images/dog-dashboard.png" id="recOrangeBarDogImg"/>
        </div>
      </div>
      <div className="clearfix"/>

      <div className="container">
        <div class="row" id="portfolio_info">

{/* Profile Info */}
        <div className="col-xs-12 col-sm-12 col-md-3 gutterWrap text-center"> 
        <div className="paperCard" id="userProfile">

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
              </div>

              {/* Submit Button */}
              <div className="form-row" id="submit-btn-container">
                  <input type="hidden" id="skill" name="skill" value=""/>
                  <button type="submit" className="btn btn-primary submitprofile hidden hider" value="Create My Profile" onClick={this.saveProfile}>Save</button>
              </div>
          </form>
          </div>
        </div>
        </div>


      {/* PUT THE POPULATION TILE BACK HERE */}
      <div className="col-md-9" id="recRightSide">
        <div className="paperCard" id="population-tiles">
          <h2 id='accordion-header'>&nbsp;Talent Pool Available</h2>

          {/* NEED HELP RENDERING */}
          <div className="populateTile">
          <PopulationTile available={this.state.availableusers} active={this.state.activeusers} open={this.state.opentoopportunities} notsearching={this.state.notsearching}/>
          </div>
        </div>

    
      
        <div className="paperCard" id='agency_info'>
        <h2>&nbsp;Recruits <button class="btn btn-primary" id="findAllUsers" onClick={this.searchUsers}>Find all</button></h2>
        {/* <div class='col-xs-12 agency-locate'> */}



          {/* <form class="form-row"> */}
            {/* <input class="form-control" type="text" id="search-input" placeholder="Enter Your City" /> */}
            {/* <button class="btn btn-primary" id="search-button" onClick={this.searchUsers}>Search</button> */}
          {/* </form>
        </div>
        </div>
        <div class="col-xs-12 recruiter-return-info" display-toggle="none">
          <div class="accordion" id="recruiterAccordion"></div>	
        </div> */}
        
        {this.state.users !== '' ?
          <UserTile users={this.state.users}/>
          : ""
        }
        </div>
      </div>
      </div>

      <Footer />
      </div>
    </div>
    )
  }
}

export default RecruiterDashboard;