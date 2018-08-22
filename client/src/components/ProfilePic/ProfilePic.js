import React, {Component} from "react";
import $ from 'jquery'
import axios from 'axios'


class ProfilePic extends Component {

  state = {
    default: "Hello World",
    selectedFile: null,
    test: '1'
  }

 
  uploadPicture () {

    let data = new FormData();    
    data.append('file', $('#file1')[0].file);

    $.ajax({
      url: `/upload/${this.props.id}/profilePic`,
      data: data,
      processData: false,
      contentType: false,
      type: 'POST',
      success: (data) => {
        if (data.err) {
          console.log("Error!");
          console.log(data.err);
          this.setState({
            errorMessage: data.err.message
          })
        } else {
          console.log(data)
        }
      },
      error: (err) => {
        console.log(err);
        this.setState({
          errorMessage: err.statusText
        })
      }
    });
  }

  catchFileName = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUpload = () => {

    const fd = new FormData();    
    fd.append('file', this.state.selectedFile)

    axios.post(`/upload/${this.props.id}/profilePic`, fd)
    .then(res => {
      console.log(res)
      this.setState({
        test: "2343"
      })
    })

  }

  render () {
    return (
    <div style={{width: '250px', position: 'relative'}} data-type={this.state.test}>

      <div>
        <input type='file' onChange={this.catchFileName}/>
        <button onClick={this.fileUpload}> Upload axios {this.state.test}</button>
      </div>



      <div style={{width: '250px', height: '250px', overflow: 'hidden'}} data-type={this.state.test}> 
        <img style={{width: '250px'}} src={`image/${this.props.id}/profilePic`} alt={this.state.test}/> {/* <--------  IMG */ }
      </div>



      <h3>{this.props.firstname}&nbsp;{this.props.lastname}</h3>

    </div>
    )
  }
}

export default ProfilePic;