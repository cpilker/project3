import React, {Component} from "react";


class Signin extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
      <div>
      <h1>{this.state.default}</h1>
      </div>
    )
  }
}

export default Signin;