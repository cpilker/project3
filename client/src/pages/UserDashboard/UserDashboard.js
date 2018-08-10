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

      
      <div>name</div>
      <div>address</div>
      <div>phone #</div>
      <div>e-mail address</div>
      <div>name</div>
      <div>name</div>
      <div>name</div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <h1 className='text-center display-4 my-4'>Mongo File Uplaods</h1>
            <form action='/upload' method='POST' enctype='multipart/form-data'>
              <div className='custom-file mb-3'>
                <input type='file' name='file' id='file' className='custom-file-input'/>
                <label for='file' className='custom-file-label'>Choose File
                </label>


              </div>
              <input type='submit' value='Submit' className='btn btn-primary btn-block'/>
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