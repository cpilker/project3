import React, {Component} from "react";
import './RecruiterTile.css';
// import recruiters from './recruiters';

class RecruiterTile extends Component {
  
  render () {
    let recruiters = this.props.recruiters;
    console.log(recruiters);

    function renderGrid(recruiters, i) {
      console.log(recruiters.recruiting_agency)
      return(
        <div className=" card [ is-collapsed ]" key={i}>
          <div className="card__inner [ js-expander ]">
            <img src="./images/recruiter-logos/charlotte_automation.jpg" alt={recruiters.recruiting_agency} />
          </div>
          <div className="card__expander expand_animation">
            <div className="expander__content">
              <h2>{recruiters.recruiting_agency}</h2>
              <p>{recruiters.description}</p>
              <h2>Contact Info</h2>
              <p>{recruiters.street_address1} {recruiters.unit1}, {recruiters.city1}, {recruiters.state1} {recruiters.zip_code1}<br />
              <a href={recruiters.website}>{recruiters.website}</a></p>
            </div>
          </div>
        </div>
      )
    }

    function propsCheck(recruiters) {
      if(Array.isArray(recruiters)){
        return recruiters.map(renderGrid)
      }
    }

    return (
      <div className="container">
        <div className="cards">
          {propsCheck(recruiters)}
        </div>
      </div>
    )
  }
}

export default RecruiterTile;