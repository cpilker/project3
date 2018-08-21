import React, {Component} from "react";


class PopulationTile extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
        <div className="paperCard">
          {this.props.popvalue}
        </div>
    )
  }
}

export default PopulationTile;