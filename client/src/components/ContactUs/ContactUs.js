import React, { Component } from "react";
import "./contact.js";

import $ from 'jquery'

class ContactUs extends Component {

  componentDidMount () {

    $("#showContactModal").on("click", function () { // Button to display the contact us modal

        $("#jobseekercontact").attr("style", "display: inline-block");
        $("#recruitercontact").attr("style", "display: inline-block");
        $("#jobseekerform").attr("style", "display: none");
        $("#recruiterform").attr("style", "display: none");
        $('#contactus-success').attr("style", "display: none");
        $('#contactus-error').attr("style", "display: none");
    })
    
    $("#jobseekercontact").on("click", function() {   // Button to display the job seeker contact form
        $(this).attr("style", "display: none");
        $("#recruitercontact").attr("style", "display: none");
        $("#jobseekerform").attr("style", "display: block")
    
        $(".submitjobseeker").on("click", function() {   // Button to submit the job seeker contact form
            console.log("Submit has been fired");
            // event.preventDefault();
            // Prevent submitting the form again until the current one finishes
            $(this).toggleClass('disabled');
            $(this).prop('disabled', true);
    
            upsertUser({   // Build the userData object
                person_name: $('#contactus-name').val(),
                number1: $('#contactus-phone').val(),
                email: $('#contactus-email').val(),
                message: $('#contactus-message').val()
            })
    
            function upsertUser(userData) {   // Use userData object to fire some post methods
                $.post("/api/userContacts", userData).then(console.log("Database updated!"))   // Write userData to the database
    
                $.post("/api/sendmail", userData, function(res) {    // Send email containing userData
                    console.log(res.status);
                    if (res.status === 'success') {
                        $('#contactus-name').val('');  // Clear the contact form
                        $('#contactus-phone').val('');
                        $('#contactus-email').val('');
                        $('#contactus-message').val('');
                        $('.modal-title').append('');
                        $('#contactus-success').attr('style', 'display: block');   // Display a success message
                        setTimeout(function() {   // Remove success message and allow a new form submit after 4 seconds
                            $('#contactus-success').attr('style', 'display: none');
                            $(".submitjobseeker").toggleClass('disabled');
                            $(".submitjobseeker").removeAttr('disabled'); 
                        }, 4000);
                    } else {
                        $('#contactus-error').attr('style', 'display: block');   // Display an error message
                        setTimeout(function() {   // Remove success message and allow a new form submit after 4 seconds
                            $('#contactus-error').attr('style', 'display: none');
                            $(".submitjobseeker").toggleClass('disabled');
                            $(".submitjobseeker").removeAttr('disabled'); 
                        }, 4000);
                    }
                })
    
            }
        });
    });
    
    $("#recruitercontact").on("click", function() {   // Button to display the recruiter contact form
        $("#jobseekercontact").attr("style", "display: none");
        $(this).attr("style", "display: none");
        $("#recruiterform").attr("style", "display: block")
    
        $(".submitrecruiter").on("click", function() {   // Button to submit the recruiter contact form
            console.log("Submit has been fired");
            // event.preventDefault();
            // Prevent submitting the form again until the current one finishes
            $(this).toggleClass('disabled');
            $(this).prop('disabled', true);        
    
            upsertRecruiter({   // Build the recruiterData object
                recruiting_agency: $('#recruiter-company').val(),
                person_name: $('#recruiter-name').val(),
                number1: $('#recruiter-phone').val(),
                email: $('#recruiter-email').val(),
                message: $('#recruiter-message').val()
            })
    
            function upsertRecruiter(recruiterData) {
                $.post("/api/recruiterContacts", recruiterData).then(console.log("Database updated!!"))   // Write recruiterData to the database
    
                $.post("/api/contactus-recruiter", recruiterData, function(res) {    // Send email containing recruiterData
                    console.log(res.status);
                    if (res.status === 'success') {
                        $('#recruiter-name').val('');  // Clear the contact form
                        $('#recruiter-company').val('');
                        $('#recruiter-phone').val('');
                        $('#recruiter-email').val('');
                        $('#recruiter-message').val('');
                        $('.modal-title').append('');
                        $('#contactus-success').attr('style', 'display: block');   // Display a success message
                        setTimeout(function() {   // Remove success message and allow a new form submit after 4 seconds
                            $('#contactus-success').attr('style', 'display: none');
                            $(".submitrecruiter").toggleClass('disabled');
                            $(".submitrecruiter").removeAttr('disabled'); 
                        }, 4000);
                         
                    } else {
                        $('#contactus-error').attr('style', 'display: block');   // Display an error message
                        setTimeout(function() {   // Remove error message and allow a new form submit after 4 seconds
                            $('#contactus-error').attr('style', 'display: none');
                            $(".submitrecruiter").toggleClass('disabled');
                            $(".submitrecruiter").removeAttr('disabled'); 
                        }, 4000);
                    }
                })
              
            }       
        });
    });

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
                <button type="button" className="btn btn-primary" id="jobseekercontact">Job Seeker</button>
                <button type="button" className="btn btn-secondary" id="recruitercontact">Recruiter</button>
                <form id="jobseekerform" style={{display: "none"}}>
                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-name">Name</label>
                    <input type="text" className="form-control" id="contactus-name" placeholder="Jane Doe" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-email">Email</label>
                    <input type="email" className="form-control" id="contactus-email" placeholder="janedoe@techworkers.com" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-phone">Phone</label>
                    <input type="text" className="form-control" id="contactus-phone" placeholder="123-456-7890" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="contactus-message">Message</label>
                    <textarea className="form-control" id="contactus-message" rows="3"></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary submitjobseeker">Submit</button>
                </form>
                            
                <form id="recruiterform" style={{display: "none"}}>
                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-name">Name</label>
                    <input type="text" className="form-control" id="recruiter-name" placeholder="Jane Doe" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-company">Recruiter Agency</label>
                    <input type="text" className="form-control" id="recruiter-company" placeholder="TechWorkers Recruiting Agency" />
                  </div>

                  <div className="form-group col-xs-12">
                  <label htmlFor="recruiter-email">Email</label>
                    <input type="email" className="form-control" id="recruiter-email" placeholder="janedoe@techworkers.com" />
                  </div>

                  <div className="form-group col-xs-12">
                    <label htmlFor="recruiter-phone">Phone</label>
                    <input type="text" className="form-control" id="recruiter-phone" placeholder="123-456-7890" />
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