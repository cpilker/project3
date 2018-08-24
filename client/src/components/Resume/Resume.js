import React, {Component} from "react";
import './Resume.css';

class Resume extends Component {
  state = {
    default: "Hello World"
  }

  render () {
    return (
    <div id="resumeBuilder">
      <h2>Resume</h2>

      <form action="/upload" method='POST' encType='multipart/form-data'>
        <div className='custom-file'>
          <input type='hidden' name='file' value={this.props.id} />
          <input type='hidden' name='file' value='Resume' />
          <input type='file' name='file' id='file' className='custom-file-input'/>
          <input type="hidden" name="id" value={this.props.id} />
          <label htmlFor='file' className='custom-file-label browseStyle'> </label>
        </div>
        <input type='submit' value='Save' className='btn btn-primary' id="resumeSaveButton"/>
      </form>

        <form action={`/files/${this.props.id}/Resume?_method=DELETE`} method='POST' > 
          <input type='submit' value='Delete' className='btn btn-primary' id="resumeDeleteButton"/>
        </form>

        <form action={`/download/${this.props.id}/Resume?_method=GET`} method='POST' > 
          <input type='submit' value='Download' className='btn btn-primary' id="resumeDownloadButton"/>
        </form>

      <div style={{width: '250px', height: '250px', overflow: 'hidden'}} > 
        <img style={{width: '250px'}} src={"image/" + this.props.id + "/Resume"} alt=''/>
      </div>

      <h3>{this.props.firstname}&nbsp;{this.props.lastname}</h3>

    </div>
    )
  }
}

export default Resume;