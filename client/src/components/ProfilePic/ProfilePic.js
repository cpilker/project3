import React, {Component} from "react";
// import $ from 'jquery'
import axios from 'axios'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { base64StringtoFile, downloadBase64File, extractImageFileExtensionFromBase64, image64toCanvasRef } from '../../utils/imgCropTools'


class ProfilePic extends Component {

  constructor(props) {
    super(props)
    this.imagePreviewCanvasRef = React.createRef()
    this.state = {
      imgSrc: null,
      crop: {
        aspect: 1/1
      }
    }
  }

  catchFileName = event => {

    // Grabs and stores the selected img. Will change every time a new image is selected.
    const currentFile = event.target.files[0] //////////
    const reader = new FileReader()
    reader.addEventListener('load', ()=> {
      this.setState({
        imgSrc: reader.result
      })
    }, false)

    reader.readAsDataURL(currentFile) ///////////////

    // changes 
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUpload = event => {
    event.preventDefault()
    const canvasRef = this.imagePreviewCanvasRef.current
    const { imgSrc } = this.state
    const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
    const imageData64 = canvasRef.toDataURL('image/' + fileExtension)


    const myfilename = 'Profile-Picture.' + fileExtension

    // file to be uploaded
    const myNewCroppedFile = base64StringtoFile(imageData64, myfilename)
    console.log(myNewCroppedFile)
    

    console.log(event)
    const fd = new FormData();    
    console.log('fd: ' + fd)
    fd.append('file', myNewCroppedFile)
    console.log('fd1: ' + fd)
    console.log(this.state.selectedFile)

    axios.post(`/upload/${this.props.id}/profilePic`, fd)
    .then(res => {

    })



  }

  handleImageLoaded = (image) => {

  }

  handleOnCropChange = (crop) => {
    // console.log(crop)
    this.setState({crop})
  }

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current
    const { imgSrc } = this.state
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop)
  }

  handleDownloadClick = event => {
    event.preventDefault()
    const canvasRef = this.imagePreviewCanvasRef.current
    const { imgSrc } = this.state
    const fileExtension = extractImageFileExtensionFromBase64(imgSrc)
    const imageData64 = canvasRef.toDataURL('image/' + fileExtension)


    const myfilename = 'previewFile.' + fileExtension

    // file to be uploaded
    const myNewCroppedFile = base64StringtoFile(imageData64, myfilename)
    console.log(myNewCroppedFile)


    // // download file
    downloadBase64File(imageData64, myfilename)

  }

  render () {

    const {imgSrc} = this.state

    return (
    <div style={{width: '250px', position: 'relative'}} >

      <div>
        <input type='file' onChange={this.catchFileName}/>
        <button onClick={this.fileUpload}> Upload axios </button>
      </div>


      <div style={{width: '250px', height: '250px', overflow: 'hidden'}} id='img-div'> 
        {imgSrc !== null 
        ? 
          <div>
            {/* {imgSrc}
            <img style={{width: '250px'}} src={imgSrc} /> */}
          <ReactCrop 
            src={imgSrc} 
            crop={this.state.crop} 
            onImageLoaded={this.handleImageLoaded}
            onComplete={this.handleOnCropComplete}
            onChange={this.handleOnCropChange}
          />
          <br/>
          <p>Preview Canvas Crop</p>
          <button style={{float: 'left', position: 'absolute', top: '-575'}} id='testBtn' onClick={this.handleDownloadClick}> Download </button>
          <canvas style={{float: 'left', position: 'absolute', top: '-550', width: '250px'}} ref={this.imagePreviewCanvasRef}></canvas>
      

          </div> 
        : 
          <img style={{width: '250px'}} src={`image/${this.props.id}/profilePic?`} alt='profilePic'/>
        } 
      </div>

    </div>
    )
  }
}

export default ProfilePic;