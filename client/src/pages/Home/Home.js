import React, {Component} from "react";
import "./Home.css";
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';

class Home extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
      <div className="Home">
        <header>
          <Nav
          sitepath={this.props.sitepath}
          loggedIn={this.props.loggedIn}
           />

            <section className="parallax-1 intro-text">
              <div className="flex-container">
                  <div className="row">
                    <div className="flex-item">
                      <p id="company-name">Recruit<span className="fontOrange">Hound</span></p>
                      <p id="slogan">The hunt is on.</p>
                    </div>
                  </div>
                  <div className="flex-item">
                    <a href="/signup"><div id="create-profile-button">Create a Profile</div></a>
                  </div>
              </div>
            </section>

        </header>
    
        <section className="section section-light sectionOne"> 
          <div className="logo">
            <img src="/images/hounddog.png" alt="hounddog.png" />
          </div>
          <span name="two"></span>
        </section>

        <section id="what-we-do" className="d-flex justify-content-center container">
          <div id="what-we-do-title">
            <h2>How It Works</h2>
              <div>
                <p id="orange-line"></p>
              </div>
          </div>
          <div id="what-we-do-message">
            <p>Job hunting is hard. We get it. We make it easy to connect with recuiters and hiring managers, delivering careers in your field directly to you. Why waste time hunting through cumbersome job postings?</p> 
            <p className="mediumBold">Let Recruit<span className="fontOrange">Hound</span> handle the hunt for you.</p>
          </div>
          <section className="container">
            <div id="what-we-do-body" className="row">
              <div id="stepone" className="col-md-4">
                <span><i className="fab fa-wpforms"></i></span>
                <p>Create a job seeker profile. Let recruiters know your skills and what type of job you are looking for.</p>
              </div>
              <div id="steptwo" className="col-md-4">
                <span><i className="fas fa-user-tie"></i></span>
                <p>Your profile is connected to recruiters interested in your particular set of skills using a proprietary algorithm we call "Fetch".</p>
              </div>
              <div id="stepthree" className="col-md-4">
                <span><i className="fas fa-briefcase"></i></span>
                <p>Receive job offers from recuiters by phone and email. Accept the offers you like, decline the offers you don't.</p>
              </div>
            </div>
          </section>
        </section>


        <div className="text-center">
          <Footer />
        </div>

      </div>
    )
  }
}

export default Home;