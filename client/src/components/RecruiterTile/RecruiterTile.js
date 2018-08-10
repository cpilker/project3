import React, {Component} from "react";
import './RecruiterTile.css';
import * as utils from './grid.js';

class RecruiterTile extends Component {
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
              <img src="./images/recruiter-logos/charlotte_automation.jpg" />
            </div>
            <div className="card__expander expand_animation">
              <div className="expander__content">
              <h2>Automation Personnel Services of Charlotte</h2>
              <p>We specialize in providing light industrial employees to a variety of customers. In fact, ninety-four percent of our company-wide staffing is light industrial, so our expertise in this field far exceeds that of our competition. Our employees fill needs in plastics manufacturing, electronics manufacturing, warehousing, assembly and production lines for various products, distribution centers, and other labor-intensive needs.</p>

              <h2>Contact Info</h2>
              <p>5939 South Blvd<br/>
              Charlotte, NC 28217<br/>
              205-733-3700</p>

              <p><a href="http://www.apstemps.com" target="_blank">http://www.apstemps.com</a></p>
              </div>
            </div>
          </div>

          <div className=" card [ is-collapsed ] ">
            <div className="card__inner [ js-expander ]">
              <img src="./images/recruiter-logos/charlotte_ettain_group.jpg" />
            </div>
            <div className="card__expander expand_animation">
              Expander
            </div>
          </div>

          <div className=" card [ is-collapsed ] ">
            <div className="card__inner [ js-expander ]">
              <img src="./images/recruiter-logos/charlotte_insight_global.jpg" />
            </div>
            <div className="card__expander expand_animation">
              Expander
            </div>
          </div>   
                 
          <div className=" card [ is-collapsed ] ">
            <div className="card__inner [ js-expander ]">
              <img src="./images/recruiter-logos/charlotte_automation.jpg" />
            </div>
            <div className="card__expander expand_animation">
              Expander
            </div>
          </div>

        {/* </div>
        <div className="cards">           */}

          <div className=" card [ is-collapsed ] ">
            <div className="card__inner [ js-expander ]">
              <img src="./images/recruiter-logos/charlotte_ettain_group.jpg" />
            </div>
            <div className="card__expander expand_animation">
              Expander
            </div>
          </div>

          <div className=" card [ is-collapsed ] ">
            <div className="card__inner [ js-expander ]">
              <img src="./images/recruiter-logos/charlotte_insight_global.jpg" />
            </div>
            <div className="card__expander expand_animation">
              Expander
            </div>
          </div>                    

        </div>

        </div>
      </div>
    )
  }
}

export default RecruiterTile;