// Using ReactExpandableGrid from https://github.com/karthicashokan/react-expandable-grid

import React, {Component} from "react";
import PropTypes from 'prop-types';
import SingleGridCell from './SingleGridCell';
import './ReactExpandableGrid.css';

class ReactExpandableGrid extends Component {

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      selected_id: '',
      // gridData: JSON.parse(this.props.gridData)
    }
  }

  handleResize () {
    if (this.state.expanded) {
      var target = document.getElementById(this.state.selected_id)
      this.renderExpandedDetail(target)
    }
    this.makeItMobileFriendly()
  }

  makeItMobileFriendly () {
    var leftPanel = document.getElementById('ExpandedDetail_left')
    var rightPanel = document.getElementById('ExpandedDetail_right')
    if (window.innerWidth < this.props.show_mobile_style_from_width) {
      leftPanel.style.display = 'none'
      rightPanel.style.width = '100%'
    } else {
      leftPanel.style.display = 'block'
      leftPanel.style.width = this.props.ExpandedDetail_left_width
      rightPanel.style.width = this.props.ExpandedDetail_right_width
    }
  }

  componentWillMount () {
    window.addEventListener('resize', this.handleResize.bind(this))
  }

  componentWillUnmount () { }

  renderExpandedDetail (target) {
    var thisId = target.id
    var thisIdNumber = parseInt(thisId.substring(10))
    var detail = document.getElementById('expandedDetail')
    var ol = target.parentNode
    var lengthOfList = parseInt(ol.childNodes.length)
    var startingIndex = thisIdNumber + 1

    var insertedFlag = false

    ol.insertBefore(detail, ol.childNodes[lengthOfList])

    for (var i = startingIndex; i < lengthOfList; i++) {
      if (ol.childNodes[i].className === 'SingleGridCell') {
        if (ol.childNodes[i].offsetTop !== ol.childNodes[thisIdNumber].offsetTop) {
          ol.childNodes[i].insertAdjacentElement('beforebegin', detail)
          insertedFlag = true
          break
        }
      }
    }

    if (insertedFlag === false) {
      ol.childNodes[lengthOfList - 1].insertAdjacentElement('afterend', detail)
    }

    var cell = document.getElementById(thisId)
    var arrow = document.getElementById('selected_arrow')
    cell.append(arrow)
    arrow.style.display = 'block'
  }

  closeExpandedDetail () {
    this.setState({
      expanded: false,
      selected_id: ''
    }, function afterStateChange () {
      var detail = document.getElementById('expandedDetail')
      detail.style.display = 'none'
      var arrow = document.getElementById('selected_arrow')
      arrow.style.display = 'none'
    })
  }

  handleCellClick (event) {
    var target = event.target
    var thisIdNumber = parseInt(event.target.id.substring(10))

    if (this.state.expanded) { // expanded == true
      if (this.state.selected_id === event.target.id) { // Clicking on already opened detail
        this.closeExpandedDetail()
        this.renderExpandedDetail(target)
      } else { // Clicking on a different thumbnail, when detail is already expanded
        this.setState({
          expanded: true,
          selected_id: event.target.id
        }, function afterStateChange () {
          var detail = document.getElementById('expandedDetail')
          var description = document.getElementById('ExpandedDetailDescription')
          var title = document.getElementById('ExpandedDetailTitle')
          var img = document.getElementById('ExpandedDetailImage')
          var DescriptionLink = document.getElementById('ExpandedDetailDescriptionLink')
          var ImageLink = document.getElementById('ExpandedDetailImageLink')
          var parsedData = JSON.parse(this.props.gridData)
          description.innerHTML = `${parsedData[thisIdNumber]['description']}<br/><br/><b>Contact Info</b><br/>${parsedData[thisIdNumber]['street_address1']}<br/>${parsedData[thisIdNumber]['unit1']}<br/>${parsedData[thisIdNumber]['city1']}, ${parsedData[thisIdNumber]['state1']} ${parsedData[thisIdNumber]['zip_code1']}`
          title.innerHTML = parsedData[thisIdNumber]['recruiting_agency']
          img.src = parsedData[thisIdNumber]['img']
          DescriptionLink.href = parsedData[thisIdNumber]['website']
          ImageLink.href = parsedData[thisIdNumber]['website']

          this.renderExpandedDetail(target)

          detail.style.display = 'block'
        })
      }
    } else { // expanded == false
      this.setState({
        expanded: true,
        selected_id: event.target.id
      }, function afterStateChange () {
        var detail = document.getElementById('expandedDetail')
        var description = document.getElementById('ExpandedDetailDescription')
        var title = document.getElementById('ExpandedDetailTitle')
        var img = document.getElementById('ExpandedDetailImage')
        var DescriptionLink = document.getElementById('ExpandedDetailDescriptionLink')
        var ImageLink = document.getElementById('ExpandedDetailImageLink')
        var parsedData = JSON.parse(this.props.gridData)
        description.innerHTML = `${parsedData[thisIdNumber]['description']}<br/><br/><b>Contact Info</b><br/>${parsedData[thisIdNumber]['street_address1']}<br/>${parsedData[thisIdNumber]['unit1']}<br/>${parsedData[thisIdNumber]['city1']}, ${parsedData[thisIdNumber]['state1']} ${parsedData[thisIdNumber]['zip_code1']}`
        title.innerHTML = parsedData[thisIdNumber]['recruiting_agency']
        img.src = parsedData[thisIdNumber]['img']
        DescriptionLink.href = parsedData[thisIdNumber]['website']
        ImageLink.href = parsedData[thisIdNumber]['website']

        this.renderExpandedDetail(target)

        detail.style.display = 'block'
      })
    }
  }

  generateGrid () {
    var grid = []
    var idCounter = -1 // To help simplify mapping to object array indices. For example, <li> with 0th id corresponds to 0th child of <ol>
    var gridData = JSON.parse(this.props.gridData)
    console.log(gridData);

    for (var i in gridData) {
      idCounter = idCounter + 1
      var thisUniqueKey = 'grid_cell_' + idCounter.toString()
      grid.push(<SingleGridCell handleCellClick={this.handleCellClick.bind(this)} key={thisUniqueKey} id={thisUniqueKey} cellMargin={this.props.cellMargin} SingleGridCellData={gridData[i]} cellSize={this.props.cellSize} />)
    }

    var cssforExpandedDetail = {
      backgroundColor: this.props.detailBackgroundColor,
      height: this.props.detailHeight,
      display: 'none',
      position: 'relative',
      padding: '20px',
      animation: 'fade 1s',
      borderRadius: '10px'
    }

    var cssforExpandedDetailImage = {
      display: 'inline-block',
      maxWidth: this.props.ExpandedDetail_image_size,
      width: '100%',
      height: 'auto',
      align: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: 'auto'
    }

    var cssforExpandedDetailTitle = {
      backgroundColor: this.props.ExpandedDetail_title_bgColor,
      width: '100%',
      height: 'auto',
      marginBottom: '15px'
    }

    var cssforExpandedDetailDescription = {
      backgroundColor: this.props.ExpandedDetail_description_bgColor,
      color: this.props.ExpandedDetail_font_color,
      width: 'auto%',
      height: '80%',
      marginRight: '30px',
      marginLeft: '30px',
      textAlign: 'justify'
    }

    var cssforExpandedDetailLeft = {
      width: this.props.ExpandedDetail_left_width,
      height: '100%',
      float: 'left',
      position: 'relative'
    }

    var cssforExpandedDetailRight = {
      width: this.props.ExpandedDetail_right_width,
      height: '100%',
      float: 'right',
      position: 'relative'
    }

    var cssForDescriptionLink = {
      textDecoration: 'none',
      position: 'relative',
      float: 'bottom',
      bottom: 20,
      cursor: 'pointer'
    }

    var cssForImageLink = {
      cursor: 'pointer'
    }

    var cssforExpandedDetailClose = {
      textDecoration: 'none',
      position: 'relative',
      float: 'right',
      top: 10,
      right: 10,
      cursor: 'pointer'
    }

    // Make Mobile Friendly
    if (window.innerWidth < this.props.show_mobile_style_from_width) {
      cssforExpandedDetailLeft = {
        width: '0%',
        height: '100%',
        float: 'left',
        position: 'relative',
        display: 'none'
      }

      cssforExpandedDetailRight = {
        width: '100%',
        height: '100%',
        float: 'right',
        position: 'relative'
      }
    }

    var closeX
    if (this.props.ExpandedDetail_closeX_bool) {
      closeX = 'X'
    } else {
      closeX = ''
    }

    grid.push(
      <li style={cssforExpandedDetail} key='expandedDetail' id='expandedDetail'>
        <div id='ExpandedDetail_left'className='ExpandedDetail_left' style={cssforExpandedDetailLeft}>
          <a id='ExpandedDetailImageLink' style={cssForImageLink}>
            <img id='ExpandedDetailImage' className='ExpandedDetailImage' style={cssforExpandedDetailImage} />
          </a>
        </div>
        <div id='ExpandedDetail_right' className='ExpandedDetail_right' style={cssforExpandedDetailRight}>
          <div id='ExpandedDetail_close' key='ExpandedDetail_close' style={cssforExpandedDetailClose} onClick={this.closeExpandedDetail.bind(this)}>{closeX}</div>
          <div id='ExpandedDetailTitle' className='ExpandedDetailTitle' style={cssforExpandedDetailTitle}> Title </div>
          <div id='ExpandedDetailDescription' className='ExpandedDetailDescription' style={cssforExpandedDetailDescription}> Some Description</div>
          <a id='ExpandedDetailDescriptionLink' style={cssForDescriptionLink}> → Link </a>
        </div>
      </li>
     )
     console.log(grid)
    return grid
  }

  render () {
    var rows = this.generateGrid()

    var cssForGridDetailExpansion = {
      width: '100%',
      position: 'relative'
    }

    var cssForGridList = {
      listStyle: 'none',
      padding: 0,
      display: 'inline-block'
    }

    var cssForTheGridHolder = {
      width: '100%',
      backgroundColor: this.props.bgColor,
      margin: 0,
      textAlign: 'center'
    }

    var cssForSelectedArrow = {
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: '32px solid' + this.props.detailBackgroundColor,
      marginTop: this.props.cellSize,
      marginLeft: this.props.cellSize / 2 - 20,
      display: 'none',
      animation: 'fade 1s'
    }

    return (
      <div id='GridDetailExpansion' style={cssForGridDetailExpansion}>
        <div id='theGridHolder' style={cssForTheGridHolder}>
          <ol id='gridList' style={cssForGridList}>
            {rows}
          </ol>
        </div>
        <div id='selected_arrow' style={cssForSelectedArrow} />
      </div>
    )
  }
}

ReactExpandableGrid.propTypes = {
  gridData: PropTypes.string,
  cellSize: PropTypes.number,
  cellMargin: PropTypes.number,
  bgColor: PropTypes.string,
  detailWidth: PropTypes.string, // in %
  detailHeight: PropTypes.number,
  detailBackgroundColor: PropTypes.string,
  ExpandedDetail_right_width: PropTypes.string, // in %
  ExpandedDetail_left_width: PropTypes.string, // in %
  ExpandedDetail_description_bgColor: PropTypes.string,
  ExpandedDetail_title_bgColor: PropTypes.string,
  ExpandedDetail_img_bgColor: PropTypes.string,
  ExpandedDetail_link_text: PropTypes.string,
  ExpandedDetail_font_color: PropTypes.string,
  ExpandedDetail_closeX_bool: PropTypes.bool,
  show_mobile_style_from_width: PropTypes.number
}

ReactExpandableGrid.defaultProps = {
  
  cellSize: 240,
  cellMargin: 15,
  bgColor: 'rgba(0,0,0,0)',
  detailWidth: '100%',
  detailHeight: 350,
  detailBackgroundColor: '#D9D9D9',
  ExpandedDetail_right_width: '70%',
  ExpandedDetail_left_width: '30%',
  ExpandedDetail_image_size: 300,
  ExpandedDetail_description_bgColor: '#D9D9D9',
  ExpandedDetail_title_bgColor: '#D9D9D9',
  ExpandedDetail_img_bgColor: '#D9D9D9',
  ExpandedDetail_link_text: '→ Link',
  ExpandedDetail_font_color: '#434343',
  ExpandedDetail_closeX_bool: false,
  show_mobile_style_from_width: 600,
}

export default ReactExpandableGrid;