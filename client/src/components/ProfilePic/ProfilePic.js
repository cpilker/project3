import React, {Component} from "react";
import $ from 'jquery'


class ProfilePic extends Component {
  state = {
    default: "Hello World"
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

  render () {
    return (
    <div style={{width: '250px', position: 'relative'}} >


      <form action={`/upload/${this.props.id}/profilePic`} method='POST' encType='multipart/form-data'>
          <input type='file' name='file' id='file' className='custom-file-input'/>
          <label htmlFor='file1' className='custom-file-label'> </label>
          <input type='submit' value='TESTING' className='' onClick={this.uploadPicture}/>
      </form>

      <form action={`/files/${this.props.id}/profilePic?_method=DELETE`} method='POST' > 
        <input type='submit' value='Delete' className=''/>
      </form>

      <form action={`/download/${this.props.id}/profilePic?_method=GET`} method='POST' > 
        <input type='submit' value='Download' className=''/>
      </form>

      <div style={{width: '250px', height: '250px', overflow: 'hidden'}} > 
        <img style={{width: '250px'}} src={`image/${this.props.id}/profilePic`} alt=''/>
      </div>



      <h3>{this.props.firstname}&nbsp;{this.props.lastname}</h3>

    </div>
    )
  }
}

export default ProfilePic;