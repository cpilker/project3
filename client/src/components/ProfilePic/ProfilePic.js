import React, {Component} from "react";
import $ from 'jquery'
import axios from 'axios'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { base64StringtoFile, downloadBase64File, extractImageFileExtensionFromBase64, image64toCanvasRef } from '../../utils/imgCropTools'
import '../../pages/UserDashboard/UserDashboard.css'
import uploadIcon from '../../images/edit.svg'




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

  componentDidMount = () => {
    // Get modal element
    const modal = document.getElementById('simpleModal')
    // Get open modal button
    const modalBtn = document.getElementById('modal-btn')
    // Get close modal button
    const closeBtn = document.getElementsByClassName('close-btn')[0]
    const closeBtn2 = document.getElementsByClassName('close-btn')[1]

    // Listen for open click
    modalBtn.addEventListener('click', openModal)
    // Listen for close click
    closeBtn.addEventListener('click', closeModal)
    // Listen for close click
    closeBtn2.addEventListener('click', closeModal)
    // Listen for outside click
    window.addEventListener('click', clickOutside)

    // Opens the modal
    function openModal() {
      modal.style.display = 'block'
    }
    // Closes the modal
    function closeModal() {
      modal.style.display = 'none'
    }
    // Closes modal if clicking outside
    function clickOutside(e) {
      if(e.target == modal) {
        modal.style.display = 'none'
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


    const myfilename = 'charlotte_gruop.' + fileExtension

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
    <div style={{position: 'relative'}} >


      <img style={{float: 'right'}} id='modal-btn' src={uploadIcon}/>

      <div id='simpleModal' class='modal2'>
        <div class='modal-content2'>
        <span class='close-btn'>&times;</span>
          <div style={{width: '100%', height: 'auto'}}>
            <input style={{display: 'none'}} type='file' onChange={this.catchFileName} ref={fileInput => this.fileInput = fileInput}/>
            <button onClick={() => this.fileInput.click()}> choose a picture </button>
            {imgSrc !== null 
            ? 
              <div>
                <div style={{float:'left', height: '100px'}}>
                <ReactCrop 
                  src={imgSrc} 
                  crop={this.state.crop} 
                  onImageLoaded={this.handleImageLoaded}
                  onComplete={this.handleOnCropComplete}
                  onChange={this.handleOnCropChange}
                />
                </div>
              {/* <button style={{float: 'left', position: 'absolute', top: '-575'}} id='testBtn' onClick={this.handleDownloadClick}> Download </button> */}
              </div> 
            : 
              <img style={{width: '100%', height: 'auto'}} src={`image/${this.props.id}/profilePic?`} alt='profile-picture'/>
            } 
            <button class='close-btn' onClick={this.fileUpload}> Save </button>
          </div>
        </div>
      </div>


      <div style={{height: 'auto', overflow: 'hidden'}} id='userImage' > 
        {imgSrc !== null 
        ? 
          <div>

            <canvas style={{width: '100%', height: 'auto'}} ref={this.imagePreviewCanvasRef}></canvas>
            <ReactCrop 
              // src={imgSrc} 
              crop={this.state.crop} 
              onImageLoaded={this.handleImageLoaded}
              onComplete={this.handleOnCropComplete}
              onChange={this.handleOnCropChange}
            />
          </div> 
        : 
          <img style={{width: '100%', height: 'auto'}} src={`image/${this.props.id}/profilePic?`} alt='profile-picture'/>
        } 
      </div>

    </div>
    )
  }
}

export default ProfilePic;

// Bug list...
// 1: When you upload a picture by hitting the save button...if you hit the button again it breaks the app.