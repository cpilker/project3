import React, {Component} from "react";
import './RecruiterTile.css';
import * as utils from './grid.js';
import recruiters from './recruiters';

class RecruiterTile extends Component {
  
  // Initialize grid logic when component mounts
  componentDidMount () {
    utils.gridFunction()
  }

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
        {recruiters.map(renderGrid)}
      </div>
    )
  }

  // render () {
  //   return (
  //     <div>
  //       <div className="container">

  //       <div className="cards">

  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_automation.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             <div className="expander__content">
  //             <h2>Automation Personnel Services of Charlotte</h2>
  //             <p>We specialize in providing light industrial employees to a variety of customers. In fact, ninety-four percent of our company-wide staffing is light industrial, so our expertise in this field far exceeds that of our competition. Our employees fill needs in plastics manufacturing, electronics manufacturing, warehousing, assembly and production lines for various products, distribution centers, and other labor-intensive needs.</p>

  //             <h2>Contact Info</h2>
  //             <p>5939 South Blvd<br/>
  //             Charlotte, NC 28217<br/>
  //             205-733-3700</p>

  //             <p><a href="http://www.apstemps.com" target="_blank">http://www.apstemps.com</a></p>
  //             </div>
  //           </div>
  //         </div>

  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_ettain_group.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             Expander
  //           </div>
  //         </div>

  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_insight_global.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             Expander
  //           </div>
  //         </div>   
                 
  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_automation.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             Expander
  //           </div>
  //         </div>

  //       {/* </div>
  //       <div className="cards">           */}

  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_ettain_group.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             Expander
  //           </div>
  //         </div>

  //         <div className=" card [ is-collapsed ] ">
  //           <div className="card__inner [ js-expander ]">
  //             <img src="./images/recruiter-logos/charlotte_insight_global.jpg" />
  //           </div>
  //           <div className="card__expander expand_animation">
  //             Expander
  //           </div>
  //         </div>                    

  //       </div>

  //       </div>
  //     </div>
  //   )
  // }
}

export default RecruiterTile;