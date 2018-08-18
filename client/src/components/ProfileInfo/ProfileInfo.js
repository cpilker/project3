import React, {Component} from "react";


class ProfileInfo extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
    <div className='container'>
      <img style={{width: '250px', height: 'auto'}} src={"image/" + this.props.id + "/profilePic"} alt=''/>
      <h3>  {this.props.firstname}&nbsp;{this.props.lastname}</h3>
      
    <div className='row'>
      <div className='col-md-6 m-auto'>
        <h1 className='text-center display-4 my-4'>Profile Picture Upload</h1>
        <form action="/upload" method='POST' encType='multipart/form-data'>
          <div className='custom-file mb-3'>
            <input type='hidden' name='file' value={this.props.id} />
            <input type='hidden' name='file' value='profilePic' />
            <input type='file' name='file' id='file' className='custom-file-input'/>
            <label htmlFor='file' className='custom-file-label'>Choose File
            </label>
            <input type="hidden" name="id" value={this.props.id} />
          </div>
          <input type='submit' value='Save' className='btn btn-primary btn-block'/>
        </form>
        <form action={`/files/${this.props.id}/profilePic?_method=DELETE`} method='POST' > 
          <input type='submit' value='Delete' className='btn btn-primary btn-block'/>
        </form>
        <form action={`/download/${this.props.id}/profilePic?_method=GET`} method='POST' > 
          <input type='submit' value='Download' className='btn btn-primary btn-block'/>
        </form>
        
        <hr/>
      </div>
    </div>
    </div>
    )
  }
}

export default ProfileInfo;