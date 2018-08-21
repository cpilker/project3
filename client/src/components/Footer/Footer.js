import React, {Component, Fragment} from 'react';
import './Footer.css';

class Footer extends Component {
  render () {
    return (
      <Fragment>
          <div className="container text-muted text-center" id="footer">
            Find us at: <a href="https://www.facebook.com/recruithound.io" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f text-muted"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in text-muted"></i></a>
            <a href="https://twitter.com/recruit_hound" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter text-muted"></i></a>
          </div>
      </Fragment>
    )
  }
}

export default Footer;