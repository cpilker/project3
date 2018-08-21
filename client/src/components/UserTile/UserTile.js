import React, {Component} from "react";
// import '/.UserTile.css';
import $ from "jquery";



class UserTile extends Component {
  state ={
    saveUser: null
  }


  render () {
    let users = this.props.users;
    // console.log(users);
 

    function saveUser(e) {
      // e.preventDefault();
      $.ajax({
        url: '/saveuser',
        type: 'post',
        data: {
          saveUser: $('#user-tile-id').attr('data-type')
        },
        success: (response) => {
          if (response.err) {
            console.log("error on saving User");
            console.log(response.err);
          }
          else {
            console.log("Success at saving this user!!");
            console.log(response)
          }
        },
        error: (err) => {
          console.log(err)
        }
      })
  
    }


    function renderGrid(users, i) {
      // console.log(users.firstname)
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
              <button data-type={users._id} id="user-tile-id" onClick={saveUser}>You know you want me</button>
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