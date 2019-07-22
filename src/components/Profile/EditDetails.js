import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton'
//redux Imports
import {connect} from 'react-redux';
import {editUserDetails} from '../../redux/actions/userActions';
//mui Imports
import ToolTip from '@material-ui/core/Tooltip'
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
    const userDetails = {
      bio: this.state.bio,
      location: this.state.location,
      website: this.state.website
    }
    this.props.editUserDetails(userDetails);
    this.handleClose();
  }

  render () {
    const {classes} = this.props
    return (
      <Fragment>
        <MyButton tip='Edit Profile' onClick={this.handleOpen} btnClassName={classes.button}>
          <EditIcon color='primary'/>
        </MyButton>
        <Dialog
          open = {this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='sm'
        >
          <DialogTitle>Edit your details!</DialogTitle>
          <DialogContent>
            <form>
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
              <TextField
                name='website'
                type='text'
                label='Website'
                fullWidth
                palceholder='Your personal/professional website'
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.website}
              />
              <TextField
                name='location'
                type='text'
                label='Location'
                fullWidth
                palceholder='Where do you live!'
                className={classes.textField}
                onChange={this.handleChange}
                value={this.state.location}
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
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
