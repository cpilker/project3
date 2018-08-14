import React, {Component} from "react";
// import '/.UserTile.css';


class UserTile extends Component {
  render () {
    let users = this.props.users;
    console.log(users);

    function renderGrid(users, i) {
      console.log(users.firstname)
      return(
        <div className=" card [ is-collapsed ]" key={i}>
          <div className="card__inner [ js-expander ]">
            <img src="./images/recruiter-logos/charlotte_automation.jpg" alt={users.firstname} />
          </div>
          <div className="card__expander expand_animation">
            <div className="expander__content">
              <h2>{users.firstname} + {users.lastname}</h2>
              <p>{users.description}</p>
              <h2>Contact Info</h2>
              <p>{users.address1} {users.address2}, {users.city}, {users.state} {users.zip}<br />
              <p>{users.skill}</p>
              <a href={users.username}>{users.username}</a></p>
            </div>
          </div>
        </div>
      )
    }

    function propsCheck(users) {
      if(Array.isArray(users)){
        return users.map(renderGrid)
      }
    }

    return (
      <div className="container">
        <div className="cards">
          {propsCheck(users)}
        </div>
      </div>
    )
  }
}

export default UserTile;