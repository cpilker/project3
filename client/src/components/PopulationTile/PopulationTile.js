import React, {Component, Fragment} from "react";
import './PopulationTile.css';

class PopulationTile extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
      <Fragment>
        <div className="container popCardCont">
        <div className="row popCardRow">

          <div className="col-md-12 col-lg-4">
          <div className="card popCard">
            <h5 className="card-header popCardHeader">Total</h5>
            <div className="card-body popCardBody">
              <h2>{this.props.available}</h2>
            </div>
          </div>
          </div>

          <div className="col-md-12 col-lg-4">
          <div className="card popCard">
            <h5 className="card-header popCardHeader">Actively Searching</h5>
            <div className="card-body popCardBody">
              <h2>{this.props.active}</h2>
            </div>
          </div>
          </div>

          {/* <div className="card popCard">
            <h5 className="card-header popCardHeader">Open</h5>
            <div className="card-body popCardBody">
              <h2>{this.props.open}</h2>
            </div>
          </div> */}

          <div className="col-md-12 col-lg-4">
          <div className="card popCard">
            <h5 className="card-header popCardHeader">Not Searching</h5>
            <div className="card-body popCardBody">
              <h2>{this.props.notsearching}</h2>
            </div>
          </div>
          </div> 

        </div> 
        </div>

        <div className="clearfix"/>
      </Fragment>
    )
  }
}

export default PopulationTile;