import React, {Component} from "react";
import './EventBriteTile.css';
import * as utils from './grid.js';

class EventBrite extends Component {
  state = {
    default: "Hello World"
  }

  componentDidMount () {
    utils.gridFunction()
  }

  render () {
    return (
      <div>
        <div className="container">
          <div className="cards">
            <div className=" card [ is-collapsed ] ">
              <div className="card__inner [ js-expander ]">
                <img src={this.props.image} alt={this.props.event} />
              </div>
              <div className="card__expander expand_animation">
                <div className="expander__content">
                  <h2>{this.props.event}</h2>
                  <p>{this.props.description}</p>
                  <p>When: {this.props.date}</p>
                  <h2>Event Location: </h2>
                  <p><strong>{this.props.location}</strong></p>
                  <p>{this.props.street}<br/>
                  {this.props.city}, {this.props.state} {this.props.zipcode}<br/>
                  205-733-3700</p>
                  <p><a href={this.props.url} target="_blank" rel="noopener noreferrer">More Info</a></p>
                </div>
              </div>
            </div>                 
          </div>
        </div>
      </div>
    )
  }
}


export default EventBrite;