// Using a modified version of ReactExpandableGrid from https://github.com/karthicashokan/react-expandable-grid

import React, {Component} from "react";
import PropTypes from 'prop-types';
import SingleGridCell from './SingleGridCell';
import './EventBriteGrid.css';

class EventBriteGrid extends Component {

  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      selected_id: ''
    }
  }

  handleResize () {
    if (this.state.expanded) {
      let target = document.getElementById(this.state.selected_id)
      this.renderExpandedDetail(target)
    }
    this.makeItMobileFriendly()
  }

  makeItMobileFriendly () {
    let leftPanel = document.getElementById('ExpandedDetail_leftEB')
    let rightPanel = document.getElementById('ExpandedDetail_rightEB')
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
    let thisId = target.id
    let thisIdNumber = parseInt(thisId.substring(10)) 
    let detail = document.getElementById('expandedDetailEB')
    let ol = target.parentNode
    let lengthOfList = parseInt(ol.childNodes.length) 
    let startingIndex = thisIdNumber + 1

    let insertedFlag = false

    ol.insertBefore(detail, ol.childNodes[lengthOfList])

    for (let i = startingIndex; i < lengthOfList; i++) {
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

    let cell = document.getElementById(thisId)
    let arrow = document.getElementById('selected_arrowEB')
    cell.append(arrow)
    arrow.style.display = 'block'
  }

  closeExpandedDetail () {
    this.setState({
      expanded: false,
      selected_id: ''
    }, function afterStateChange () {
      let detail = document.getElementById('expandedDetailEB')
      detail.style.display = 'none'
      let arrow = document.getElementById('selected_arrowEB')
      arrow.style.display = 'none'
    })
  }

  handleCellClick (event) {
    let target = event.target
    let thisIdNumber = parseInt(event.target.id.substring(10)) 

    if (this.state.expanded) { // expanded == true
      if (this.state.selected_id === event.target.id) { // Clicking on already opened detail
        this.closeExpandedDetail()
        this.renderExpandedDetail(target)
      } else { // Clicking on a different thumbnail, when detail is already expanded
        this.setState({
          expanded: true,
          selected_id: event.target.id
        }, function afterStateChange () {
          let detail = document.getElementById('expandedDetailEB')
          let description = document.getElementById('ExpandedDetailDescriptionEB')
          let title = document.getElementById('ExpandedDetailTitleEB')
          let img = document.getElementById('ExpandedDetailImageEB')
          let DescriptionLink = document.getElementById('ExpandedDetailDescriptionLinkEB')
          let ImageLink = document.getElementById('ExpandedDetailImageLinkEB')
          let parsedData = JSON.parse(this.props.gridData)
          description.innerHTML = `${parsedData[thisIdNumber]['date']}<br/><br/>${parsedData[thisIdNumber]['description']}<br/><br/>${parsedData[thisIdNumber]['location']}<br/>${parsedData[thisIdNumber]['street']}<br/>${parsedData[thisIdNumber]['city']}, ${parsedData[thisIdNumber]['state']} ${parsedData[thisIdNumber]['zipcode']}`
          title.innerHTML = parsedData[thisIdNumber]['event']
          img.src = parsedData[thisIdNumber]['image']
          DescriptionLink.href = parsedData[thisIdNumber]['url']
          ImageLink.href = parsedData[thisIdNumber]['url']

          this.renderExpandedDetail(target)

          detail.style.display = 'block'
        })
      }
    } else { // expanded == false
      this.setState({
        expanded: true,
        selected_id: event.target.id
      }, function afterStateChange () {
        let detail = document.getElementById('expandedDetailEB')
        let description = document.getElementById('ExpandedDetailDescriptionEB')
        let title = document.getElementById('ExpandedDetailTitleEB')
        let img = document.getElementById('ExpandedDetailImageEB')
        let DescriptionLink = document.getElementById('ExpandedDetailDescriptionLinkEB')
        let ImageLink = document.getElementById('ExpandedDetailImageLinkEB')
        let parsedData = JSON.parse(this.props.gridData)
        description.innerHTML = `${parsedData[thisIdNumber]['date']}<br/><br/>${parsedData[thisIdNumber]['description']}<br/><br/>${parsedData[thisIdNumber]['location']}<br/>${parsedData[thisIdNumber]['street']}<br/>${parsedData[thisIdNumber]['city']}, ${parsedData[thisIdNumber]['state']} ${parsedData[thisIdNumber]['zipcode']}`
        title.innerHTML = parsedData[thisIdNumber]['event']
        img.src = parsedData[thisIdNumber]['image']
        DescriptionLink.href = parsedData[thisIdNumber]['url']
        ImageLink.href = parsedData[thisIdNumber]['url']

        this.renderExpandedDetail(target)

        detail.style.display = 'block'
      })
    }
  }

  generateGrid () {
    let grid = []
    let idCounter = -1 // To help simplify mapping to object array indices. For example, <li> with 0th id corresponds to 0th child of <ol>
    let gridData = JSON.parse(this.props.gridData)
    console.log(gridData);

    for (let i in gridData) {
      idCounter = idCounter + 1
      let thisUniqueKey = 'grid_cell_' + idCounter.toString()
      grid.push(<SingleGridCell handleCellClick={this.handleCellClick.bind(this)} key={thisUniqueKey} id={thisUniqueKey} cellMargin={this.props.cellMargin} SingleGridCellData={gridData[i]} cellSize={this.props.cellSize} />)
    }

    let cssforExpandedDetail = {
      backgroundColor: this.props.detailBackgroundColor,
      height: this.props.detailHeight,
      display: 'none',
      position: 'relative',
      padding: '20px',
      animation: 'fade 1s',
      borderRadius: '10px'
    }

    let cssforExpandedDetailImage = {
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

    let cssforExpandedDetailTitle = {
      backgroundColor: this.props.ExpandedDetail_title_bgColor,
      width: '100%',
      height: 'auto',
      marginBottom: '15px'
    }

    let cssforExpandedDetailDescription = {
      backgroundColor: this.props.ExpandedDetail_description_bgColor,
      color: this.props.ExpandedDetail_font_color,
      width: 'auto%',
      height: '80%',
      marginRight: '30px',
      marginLeft: '30px',
      textAlign: 'justify'
    }

    let cssforExpandedDetailLeft = {
      width: this.props.ExpandedDetail_left_width,
      height: '100%',
      float: 'left',
      position: 'relative'
    }

    let cssforExpandedDetailRight = {
      width: this.props.ExpandedDetail_right_width,
      height: '100%',
      float: 'right',
      position: 'relative'
    }

    let cssForDescriptionLink = {
      textDecoration: 'none',
      position: 'relative',
      float: 'bottom',
      bottom: 20,
      cursor: 'pointer'
    }

    let cssForImageLink = {
      cursor: 'pointer'
    }

    let cssforExpandedDetailClose = {
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

    let closeX
    if (this.props.ExpandedDetail_closeX_bool) {
      closeX = 'X'
    } else {
      closeX = ''
    }

    grid.push(
      <li style={cssforExpandedDetail} key='expandedDetailEB' id='expandedDetailEB'>
        <div id='ExpandedDetail_leftEB'className='ExpandedDetail_left' style={cssforExpandedDetailLeft}>
          <a id='ExpandedDetailImageLinkEB' style={cssForImageLink}>
            <img id='ExpandedDetailImageEB' className='ExpandedDetailImage' style={cssforExpandedDetailImage} alt='' />
          </a>
        </div>
        <div id='ExpandedDetail_rightEB' className='ExpandedDetail_right' style={cssforExpandedDetailRight}>
          <div id='ExpandedDetail_closeEB' key='ExpandedDetail_close' style={cssforExpandedDetailClose} onClick={this.closeExpandedDetail.bind(this)}>{closeX}</div>
          <div id='ExpandedDetailTitleEB' className='ExpandedDetailTitle' style={cssforExpandedDetailTitle}> Title </div>
          <div id='ExpandedDetailDescriptionEB' className='ExpandedDetailDescription' style={cssforExpandedDetailDescription}> Some Description</div>
          <a id='ExpandedDetailDescriptionLinkEB' style={cssForDescriptionLink}> → Link </a>
        </div>
      </li>
     )
     console.log(grid)
    return grid
  }

  render () {
    let rows = this.generateGrid()

    let cssForGridDetailExpansion = {
      width: '100%',
      position: 'relative'
    }

    let cssForGridList = {
      listStyle: 'none',
      padding: 0,
      display: 'inline-block'
    }

    let cssForTheGridHolder = {
      width: '100%',
      backgroundColor: this.props.bgColor,
      margin: 0,
      textAlign: 'center'
    }

    let cssForSelectedArrow = {
      width: 0,
      height: 0,
      borderLeft: '20px solid transparent',
      borderRight: '20px solid transparent',
      borderBottom: '31px solid' + this.props.detailBackgroundColor,
      marginTop: this.props.cellSize,
      marginLeft: this.props.cellSize / 2 - 20,
      display: 'none',
      animation: 'fade 1s'
    }

    return (
      <div id='GridDetailExpansionEB' style={cssForGridDetailExpansion}>
        <div id='theGridHolderEB' style={cssForTheGridHolder}>
          <ol id='gridListEB' style={cssForGridList}>
            {rows}
          </ol>
        </div>
        <div id='selected_arrowEB' style={cssForSelectedArrow} />
      </div>
    )
  }
}

EventBriteGrid.propTypes = {
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

EventBriteGrid.defaultProps = {
  
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

export default EventBriteGrid;