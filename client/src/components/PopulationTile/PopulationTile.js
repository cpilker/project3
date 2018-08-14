import React, {Component} from "react";


class PopulationTile extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    let availableUsers = this.props.availableUsers;
    console.log(availableUsers);

      
    function renderGrid(availableUsers, i) {
      console.log(availableUsers)
      return(
        <div className=" card " key={i}>
          {/* <div className="card__inner [ js-expander ]"> */}
            <p>Hello</p>
            <p>{availableUsers}</p>
          {/* </div> */}
        </div>
      )}
    function propsCheck(availableUsers) {
      if(Array.isArray(availableUsers)){
        return availableUsers.map(renderGrid)
      }
    }
    return (
      <div className="container">
        <div className="cards">
          {propsCheck(availableUsers)}
        </div>
      </div>
    )
  }
}

export default PopulationTile;