import React, {Component} from "react";

class EventBrite extends Component {
    componentDidMount() {
        this.props.getEventBrite
    }
    render() {
        return(
        <ul className="event-brite">
        <li>hi</li>
        {/* {results.map(result => (
            <li key={result} className="event">Hi
                <img alt="event"className="img-fluid"/> 
            </li>
        ))}  */}
    </ul>
        )
    }
   
}
export default EventBrite;