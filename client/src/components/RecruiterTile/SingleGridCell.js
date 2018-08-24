import React, {Component} from "react";
import './SingleGridCell.css';

class SingleGridCell extends Component {

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      selected_id: '',
      window_width: window.innerWidth
    }
  }

  cellClick (event) {
    this.props.handleCellClick(event)
  }

  render () {
    var SingleGridCellStyle = {
      // background: 'url(' + this.props.SingleGridCellData['img'] + ') no-repeat center center',
      backgroundSize: this.props.cellSize,
      width: this.props.cellSize,
      height: this.props.cellSize,
      display: 'inline-block',
      margin: this.props.cellMargin,
      marginBottom: 25,
      position: 'relative'
    }

    return (
      <li className='SingleGridCell' style={SingleGridCellStyle} data-id={this.props.recruiterId} id={this.props.id} onClick={this.cellClick.bind(this)}>
        <img src={`image/${this.props.recruiterId}/profilePic?`} className="recGridImageStyle"/> {/* ///////<<<<-----Matt changed this LINE*/}
      </li>
    )
  }

}

export default SingleGridCell;