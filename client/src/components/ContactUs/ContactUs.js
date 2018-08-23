import React, { Component } from "react";
import * as utils from "./contact.js";
import './ContactUs.css';

class ContactUs extends Component {

  componentDidMount () {
    utils.contactUsFunctions()
  }

  render () {
    return (
      <div className="modal" tabIndex="-1" role="dialog" id="myModal">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Contact Us</h5> <h5 id="contactus-success" style={{display: "none"}}>&nbsp;&nbsp;Message sent!</h5> <h5 id="contactus-error" style={{display: "none"}}>&nbsp;&nbsp;Error! Message not sent!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <div className="modal-body">
              <div className="contactButtons">
                <button type="button" className="btn btn-primary contactButtons" id="jobseekercontact">Job Seeker</button>
                <button type="button" className="btn btn-secondary contactButtons" id="recruitercontact" >Recruiter</button>
              </div>
                <form id="jobseekerform" style={{display: "none"}}>
                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-name">Name</label>
                    <input type="text" className="form-control" id="contactus-name" placeholder="Jane Doe" autoComplete="name" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-email">Email</label>
                    <input type="email" className="form-control" id="contactus-email" placeholder="janedoe@techworkers.com" autoComplete="email" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-phone">Phone</label>
                    <input type="text" className="form-control" id="contactus-phone" placeholder="123-456-7890" autoComplete="tel-national" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-message">Message</label>
                    <textarea className="form-control" id="contactus-message" rows="3" autoComplete="street-address"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submitjobseeker">Submit</button>
                </form>
                            
                <form id="recruiterform" style={{display: "none"}}>
                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-name">Name</label>
                    <input type="text" className="form-control" id="recruiter-name" placeholder="Jane Doe" autoComplete="name" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-company">Recruiter Agency</label>
                    <input type="text" className="form-control" id="recruiter-company" placeholder="TechWorkers Recruiting Agency" autoComplete="organization" />
                  </div>

                  <div className="form-group col-xs-12">
                  <label htmlFor="recruiter-email">Email</label>
                    <input type="email" className="form-control" id="recruiter-email" placeholder="janedoe@techworkers.com" autoComplete="email" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-phone">Phone</label>
                    <input type="text" className="form-control" id="recruiter-phone" placeholder="123-456-7890" autoComplete="tel" />
                  </div>
 
                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-message">Message</label>
                    <textarea className="form-control" id="recruiter-message" rows="3"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submitrecruiter">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div> 
        )
    }
}

export default ContactUs