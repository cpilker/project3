import React, {Component} from "react";
import './EventBriteTile.css';
// import * as utils from '../../utils/grid';  commented out because defined but not used warning

class EventBrite extends Component {

  render () {

    function renderGrid(props, i) {
      return(
        <div className=" card [ is-collapsed ]" key={i}>
          <div className="card__inner [ js-expander ]">
            <img src={props.image} alt={props.event} />
          </div>
          <div className="card__expander expand_animation">
            <div className="expander__content">
              <h2>{props.event}</h2>
              <p>{props.description}</p>
              <p>When: {props.date}</p>
              <h2>Event Location: </h2>
              <p><strong>{props.location}</strong></p>
              <p>{props.street}<br/>
              {props.city}, {props.state} {props.zipcode}<br/></p>
              <p><a href={props.url} target="_blank" rel="noopener noreferrer">More Info</a></p>
            </div>
          </div>
        </div>
      )
    }

    return (
      renderGrid(this.props)
    )
  }

}


export default EventBrite;