import React, {Component} from "react";
import axios from "axios";

// Export an object containing methods we'll use for accessing the event brite API

export default {
  getEventBrite: function() {
    return axios.get("https://www.eventbrite.com/d/" + this.props.state + "--" + this.props.city + "/science-and-tech--events--networking/technology-recruiting/?page=1");
    console.log("yo")
  }
};
