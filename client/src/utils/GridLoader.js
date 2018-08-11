import React, {Component} from "react";
import * as utils from './grid';

class GridLoader extends Component {
    componentDidMount () {
        utils.gridFunction()
    }
    render() {
        return(<div />)
    }
}

export default GridLoader;