import React, {Component} from "react";
import './RecruiterTile.css';
import * as utils from '../../utils/grid';
import recruiters from './recruiters';

class RecruiterTile extends Component {
  
  render () {

    function renderGrid(recruiters, i) {
      return(
        <div className=" card [ is-collapsed ]" key={i}>
          <div className="card__inner [ js-expander ]">
            <img src={recruiters.image} alt={recruiters.name} />
          </div>
          <div className="card__expander expand_animation">
            <div className="expander__content">
              <h2>{recruiters.name}</h2>
              <p>{recruiters.summary}</p>
              <h2>Contact Info</h2>
              <p>{recruiters.address}<br />
              {recruiters.phone}<br />
              <a href={recruiters.link}>{recruiters.link}</a></p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container">
        <div className="cards">
        {recruiters.map(renderGrid)}
        </div>
      </div>
    )
  }
}

export default RecruiterTile;