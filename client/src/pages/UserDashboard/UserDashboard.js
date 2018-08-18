import React, {Component} from "react";
import './UserDashboard.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import EventBrite from '../../components/Eventbrite';
import ProfileInfo from '../../components/ProfileInfo'
import events from './eventbrite.json';
import $ from "jquery";
import RecruiterGrid from '../../components/RecruiterTile/RecruiterGrid';
import EventBriteGrid from '../../components/Eventbrite/';
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
    loggedIn: false,
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
  }

  handleOnChange = this.handleOnChange.bind(this);
  saveProfile = this.saveProfile.bind(this);
  searchRecruiters = this.searchRecruiters.bind(this);
  // updateProfilePic = this.updateProfilePic.bind(this);


  componentDidUpdate(){

    // utils.gridFunction();

    $.ajax({
      url: '/upload',
      type: 'get',
      datatype: 'multipart/form-data',
      data: this.state.id,
      success: (response) => {
        if (response.err) {
          console.log("Error!");
          console.log(response.err);
          this.setState({
            errorMessage: response.err.message
          })
        } else {
          console.log("UPLOADDEEDDDDDDD!!!!! //// " + response)
          this.props.updateUser(response) 
        }
      }
    })
  }


  componentDidMount(){
    // utils.gridFunction();
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
      loggedIn: false,
      created: null,
      lastLogin: null,
    })
    
    $.ajax({
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
    $('#user').find(':input').each(function() {
      $(this).toggleClass('hidden');
    });
    $('#editprofile').text(function(i, text){   // Toggle Edit button text
      return text === "Edit" ? "Cancel" : "Edit";
    });
  }

  render () {
    console.log(this.state.id)
    return (
      <div className="UserDashboard container">
      <Nav
        updateUser={this.props.updateUser}
        sitepath={this.props.sitepath}
        loggedIn={this.props.loggedIn}
      />
      <ProfileInfo 
        id={this.state.id} 
        firstname={this.props.firstname} 
        lastname={this.props.lastname}
      />
      <div className="profile-form">

       
       
     
       
       
       
       
       
        <h4>Logged In? = {this.props.loggedIn.toString()}</h4>
        <button className="btn btn-primary" id="editprofile" onClick={this.editProfileButton}>Edit</button>{this.state.statusText}
          <form id="user" name="user-dashboard">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="username">{this.props.username}</label>
                <input type="email" className="form-control hidden" id="email" placeholder="Email" name="newusername" value={this.state.newusername} onChange={this.handleOnChange} required autoComplete="email"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="password">&nbsp;</label>
                <input type="password" className="form-control hidden" id="password" placeholder="Password" name="newpassword" value={this.state.newpassword} onChange={this.handleOnChange} required autoComplete="new-password" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="newfirstname">{this.props.firstname}</label>
                <input type="text" className="form-control hidden" id="newfirstname" placeholder="Jane" name="newfirstname" value={this.state.newfirstname}onChange={this.handleOnChange} required autoComplete="given-name" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="newlastname">{this.props.lastname}</label>
                <input type="text" className="form-control hidden" id="newlastname" placeholder="Smith" name="newlastname" value={this.state.newlastname} onChange={this.handleOnChange} required autoComplete="family-name" />
              </div>
            </div>
            <div className="form-group">  
                <label htmlFor="newaddress1">{this.props.address1}</label>
                <input type="text" className="form-control hidden" id="newaddress1" placeholder="1234 Main St" name="newaddress1" value={this.state.newaddress1} onChange={this.handleOnChange} required autoComplete="address-line1" />
            </div>
            <div className="form-group">
              <label htmlFor="newaddress2">{this.props.address2}</label>
              <input type="text" className="form-control hidden" id="newaddress2" placeholder="Apartment, studio, or floor" name="newaddress2" value={this.state.newaddress2} onChange={this.handleOnChange} autoComplete="address-line2" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="newcity">{this.props.city}</label>
                <input type="text" className="form-control hidden" id="newcity" name="newcity" placeholder="City" value={this.state.newcity} onChange={this.handleOnChange} required autoComplete="address-level2" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="newstate">{this.props.state}</label>
                <select id="newstate" className="form-control hidden" name="newstate" value={this.state.newstate} onChange={this.handleOnChange} required autoComplete="address-level1">
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
                <label htmlFor="newzip">{this.props.zip}</label>
                <input type="text" className="form-control hidden" id="newzip" name="newzip" placeholder="Zip" value={this.state.newzip} onChange={this.handleOnChange} required autoComplete="postal-code" />
              </div>
              {/* <div className="custom-file">
                <input type="file" className="custom-file-input" name="file" id="file" onChange={this.handleOnChange} />
                <label className="custom-file-label" htmlFor="newresume">Upload Resume</label>
              </div> */}
              <div className="form-group" id="skills-container">
                <label id="technologiesWorkWith" htmlFor="skills-block">What technologies do you work with?</label>
                <div className="btn-group-toggle" data-toggle="buttons" id="skills-block">
                    {/* //Begin list of skills */}
                    {this.props.skills}
                </div>
              </div>
            </div>
            <div className="form-row" id="submit-btn-container">
              <input type="hidden" id="skill" name="skill" value=""/>
              <button type="submit" className="btn btn-primary submitprofile hidden" value="Create My Profile" onClick={this.saveProfile}>Save</button>
            </div>
          </form>
          <form action='/api/profilepic' method='POST' encType='multipart/form-data'>
              <input type='submit' value='Save' className='btn btn-primary btn-block'/>
            </form>







        <hr />
        <div className="row" id='agency_info'>
          <h2 id='accordion-header'>Your Local Recruiters!</h2>
          <div className='col-xs-12 agency-locate'>
            <form className="form-row">
              <input className="form-control" type="text" id="search-input" placeholder="Enter Your City" />
              <button className="btn btn-primary" id="search-button" onClick={this.searchRecruiters}>Search</button>
            </form>
          </div>
        </div>
        <div className="col-xs-12 recruiter-return-info" display-toggle="none">
          <div className="accordion" id="recruiterAccordion"></div>	
        </div>
        {/* <RecruiterTile recruiters={this.state.recruitersearch}/> */}
        <RecruiterGrid gridData={JSON.stringify(this.state.recruitersearch)}/>

      <hr/>

      <EventBriteGrid gridData={JSON.stringify(this.state.events)}/>

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

    )
  }
}

export default UserDashboard;