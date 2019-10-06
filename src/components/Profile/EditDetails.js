import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton'
//redux Imports
import {connect} from 'react-redux';
import {editUserDetails, uploadImage} from '../../redux/actions/userActions';
//mui Imports
import ToolTip from '@material-ui/core/Tooltip'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//icons imports
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  button: {
    marginTop: '10px auto 10px auto',
    position: 'relative',
    float: 'right'
  },
  editButton: {
    height: 28,
    fontSize: 11,
    background: '#0099FF'
  },
  profileImage: {
    width: 140,
    height: 140,
    objectFit: 'cover',
    borderRadius: '50%'
  }
});

class EditDetails extends Component {

  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  componentDidMount() {
    const {credentials} = this.props;
    this.mapUserDetailsToState(credentials)
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : '',
    })
  }

  handleOpen = () => {
    this.setState({open: true});
    this.mapUserDetailsToState(this.props.credentials);
  }

  handleClose = () => {
    this.setState({open:false});
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    console.log('summbitted');
    const userDetails = {
      bio: this.state.bio
    }
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }

  handleImageChange = (event) => {
    console.log(event.target.files);
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append('image', img, img.name);
    this.props.uploadImage(formData);
  }

  handleEditPicture = () => {
    const fileInput = document.getElementById('userImage');
    fileInput.click();
  }


  render () {
    const {classes} = this.props
    return (
      <Fragment>
        <Button className={classes.editButton} variant='contained' fullWidth onClick={this.handleOpen}  color='default'>Edit</Button>
        <Dialog
          open = {this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Edit your details!</DialogTitle>
          <DialogContent>
            <form style={{textAlign: 'center'}}>
              <img src={this.props.imageUrl} alt="profile" className={classes.profileImage}/>
              <input hidden='hidden' type='file' id='userImage' onChange={this.handleImageChange}/>
                <MyButton tip='Edit Profile Image' onClick={this.handleEditPicture} btnClassName={classes.buttons}>
                  <EditIcon color='primary'/>
                </MyButton>
              <TextField
                name='bio'
                type='text'
                label='Bio'
                multiline
                rows='3'
                fullWidth
                palceholder='A short bio about you!'
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.bio}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color='secondary'>
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color='primary'>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails, uploadImage})(withStyles(styles)(EditDetails));
