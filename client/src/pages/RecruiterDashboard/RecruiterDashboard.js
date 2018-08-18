import React, {Component} from "react";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
// import GridLoader from '../../utils/GridLoader';
import $ from "jquery";
import UserTile from "../../components/UserTile/UserTile";
// import * as utils from '../../utils/grid';
import PopulationTile from '../../components/PopulationTile/PopulationTile';
import * as utils from '../../utils/grid';




class RecruiterDashboard extends Component {
  state = {
    default: "Hello World",
    users: '',
    availableusers: '',
    activeusers: '',
    opentoopportunities: '',
    notsearching: ''
  }

  searchUsers = this.searchUsers.bind(this)
  
  componentDidUpdate(){
    utils.gridFunction();

  }

  componentDidMount(){
    utils.gridFunction();
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
            availableusers: response.count + " Recruits available for contact"
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
            activeusers: response.count + " Recruits looking for a job"
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
            opentoopportunities: response.count +" Recruits open to opportunities"
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
            notsearching: response.count + " Recruits not searching for a job"
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

      <div className="RecruiterDashboard container">
            
      {/* <GridLoader /> */}
      <Nav
        sitepath={this.props.sitepath}
        loggedIn={this.props.loggedIn}
        updateUser={this.props.updateUser}
      />
        <div class="row" id="portfolio_info">
          <div class="col-xs-12 col-md-4">
            <div class="thumbnail" id="profile_image">
              <img class='img-thumbnail' src="./images/army.jpg" alt="army.jpg" id="image_source" />
            </div>
          </div>
          <div class="col-xs-12 col-md-8">
            <div class="profile-form">
              <form id="useredit" name="edit" method="post" action="edit">
              <h2 id="editheader">Edit Profile</h2>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="email" class="form-control" id="editemail" placeholder="Email" name="newemail" value="{{email}}" />
                </div>
                <div class="form-group col-md-6">
                  <input type="password" class="form-control" id="editpassword" placeholder="Password" name="newpassword" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="editfirstname" placeholder="Jane" name="newfirstname" value="{{firstname}}" />
                </div>
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="editlastname" placeholder="Smith" name="newlastname" value="{{lastname}}" />
                </div>
              </div>
              <div class="form-group">    
                <input type="text" class="form-control" id="editaddress1" placeholder="1234 Main St" name="newaddress1" value="{{address1}}" />
              </div>
              <div class="form-group">
                <input type="text" class="form-control" id="editaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value="{{address2}}" />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input type="text" class="form-control" id="editcity" name="newcity" placeholder="City" value="{{city}}" />
                </div>
                <div class="form-group col-md-4">
                  <select id="editstate" class="form-control" name="newstate">
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
                <div class="form-group col-md-2">
                  <input type="text" class="form-control" id="editzip" name="newzip" placeholder="Zip" value="" />
                </div>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="editresume" name="newresume" />
                  <label class="custom-file-label" for="editresume">Upload Resume</label>
                </div>
                <div class="form-group" id="skills-container">
                  <label id="skills" for="skills-block">What technologies do you work with?</label>
                  <div class="btn-group-toggle" data-toggle="buttons" id="skills-block">
                    {/* <!-- Begin list of skills --> */}
                  </div>
                </div>
              </div>
              <div class="form-row" id="save-btn-container">
                <input type="hidden" id="skill" name="skill" value="" />
                <input type="submit" class="btn btn-primary saveprofile" value="Save" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr/>

      {/* PUT THE POPULATION TILE BACK HERE */}
      <div class="row" id="population-tiles">
        <h2 id='accordion-header'>Talent Pool Available</h2>

        {/* NEED HELP RENDERING */}
        <div className="populateTile">
        <PopulationTile popvalue={this.state.availableusers}/>
        <PopulationTile popvalue={this.state.activeusers}/>
        <PopulationTile popvalue={this.state.opentoopportunities}/>
        <PopulationTile popvalue={this.state.notsearching}/>
        </div>
      </div>
      

      <hr />
      <div class="row" id='agency_info'>
      <h2 id='accordion-header'>Recruits</h2>

      <div class='col-xs-12 agency-locate'>
      <button class="btn btn-primary" id="search-button" onClick={this.searchUsers}>Find all</button>
        <form class="form-row">
          {/* <input class="form-control" type="text" id="search-input" placeholder="Enter Your City" /> */}
          {/* <button class="btn btn-primary" id="search-button" onClick={this.searchUsers}>Search</button> */}
        </form>
      </div>
      </div>
      <div class="col-xs-12 recruiter-return-info" display-toggle="none">
        <div class="accordion" id="recruiterAccordion"></div>	
      </div>
      
      <UserTile users={this.state.users}/>

      

      <Footer />
    </div>
    )
  }
}

export default RecruiterDashboard;