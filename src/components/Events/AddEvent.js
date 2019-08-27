import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import TagSuggestions from  '../../utils/TagSuggestions'
import {Redirect} from 'react-router-dom';
//Muiimports
import 'date-fns';
import CheckedIconOutlined from '@material-ui/icons/CheckCircleOutline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Divider from '@material-ui/core/Divider';
import DateFnsUtils from '@date-io/date-fns';
//icons import
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//redux Imports
import {connect} from 'react-redux';
import {addEvent,clearErrors, verifyLocation} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  textField: {
    margin: '10px auto 10px auto'
  },
  submitButton: {
    position: 'relative',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  locationContainer: {
    border: '1px solid lightgray',
    padding: 20,
    textAlign: 'center',
    borderRadius: 6,
    marginTop: 15
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  verifyLocationBtn: {
    '-webkit-transition': '0.5s',
    transition: '0.5s',
    margin: 10
  },
  addevent: {
    position: 'absolute',
    left: '50%',
    border: '3px solid white',
    padding: 5
  }
});

class AddEvent extends Component {
  constructor(props) {
    super(props)
    this.state={
      open: false,
      eventAdded: false,
      name: '',
      description: '',
      tags: [],
      startTime: new Date().toISOString(),
      endTime: new Date(new Date().getTime() + 1800000).toISOString(),
      displayLocation: '',
      location: {},
      headCount: 0,
      errors: {},
      redirectToLogin: false
    }
    this.getUserLocation = this.getUserLocation.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      })
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        eventAdded: true,
        open: false,
        name: '',
        description: '',
        tags: [],
        queryLocation: '',
        headCount: 0,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    if(this.props.authenticated) {
      this.setState({open: true})
    } else {
      this.setState({redirectToLogin: true})
    }
  }
  handleClose = () => {
    this.props.clearErrors();
    this.setState({open: false, errors: {}})
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleStartTime = (startTime) => {
    this.setState({startTime})
  }
  handleEndTime = (endTime) => {
    this.setState({endTime})
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const newEvent = {
      name: this.state.name,
      description: this.state.description,
      location: this.state.location,
      headCount: this.state.headCount,
      //tags: this.state.tags,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      queryLocation: this.state.queryLocation,
      location: this.state.location
    }
   this.props.addEvent(newEvent);
  }
  getUserLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      let location = {}
      location.lat = position.coords.latitude;
      location.lng = position.coords.longitude;
      this.setState({location});
    })
  }
  selectedTags = (tags) => {
    this.setState({tags})
  }
  render () {
    if(this.state.redirectToLogin) {
      return <Redirect to='login'/>
    }
    const {classes, UI: {loading}, userLocation} = this.props;
    return (
      <Fragment>
        <MyButton tip='Add Event' onClick={this.handleOpen}>
          <AddIcon btnClassName={classes.addevent} color='primary'/>
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth='md'
        >
          <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color='secondary'/>
          </MyButton>
          <DialogTitle>{'Add an event!'}</DialogTitle>
          <DialogContent>
            {this.state.errors.overlapped ? <Typography variant='body6' color='primary'>{this.state.errors.overlapped}</Typography> : null}
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={this.state.name}
                    onChange={this.handleChange}
                    id="name"
                    label="Name of event"
                    error={this.state.errors.name ? true : false}
                    helperText={this.state.errors.name}
                    name="name"
                    placeholder= 'Name of event'
                  />
                  <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  value={this.state.description}
                  onChange={this.handleChange}
                  fullWidth
                  name='description'
                  rows="8"
                  placeholder= 'Description'
                  margin="normal"
                  variant="outlined"
                  />
                {/*<TagSuggestions errors={this.state.errors} selectedTags={this.selectedTags} classes={classes}/>*/}
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.locationContainer}>
                    <Typography variant="subtitle1" noWrap>
                      Add meeting point
                    </Typography>
                    <Divider style={{margin: 20}}/>
                    <TextField
                      id="location"
                      fullWidth
                      label='Location'
                      placeholder= 'Select meeting point'
                      variant="outlined"
                      name="queryLocation"
                      value={this.state.queryLocation}
                      onChange={this.handleChange}
                      error={this.state.errors.location ? true : false}
                      helperText={this.state.errors.location}
                    />
                    <Divider style={{margin: 20}}/>
                    <Button variant='contained' color='primary' onClick={this.getUserLocation}>{'My Location'}</Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="mui-pickers-date"
                      label="Start Date"
                      variant='outlined'
                      value={this.state.startTime}
                      onChange={this.handleStartTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="startTime"
                      name="startTime"
                      label="Start time"
                      variant='outlined'
                      value={this.state.startTime}
                      onChange={this.handleStartTime}
                      error={this.state.errors.startTime ? true : false}
                      helperText={this.state.errors.startTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                    <Divider style={{margin: 20}}/>
                    <KeyboardDatePicker
                      margin="normal"
                      id="mui-pickers-date"
                      label="End Date"
                      variant='outlined'
                      value={this.state.endTime}
                      onChange={this.handleEndTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardTimePicker
                      margin="normal"
                      id="endTime"
                      id="endTime"
                      label="End time"
                      variant='outlined'
                      value={this.state.endTime}
                      onChange={this.handleEndTime}
                      error={this.state.errors.endTime ? true : false}
                      helperText={this.state.errors.endTime}
                      KeyboardButtonProps={{
                        'aria-label': 'change time',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

AddEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  userLocation: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI,
  userLocation: state.user.userLocation,
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {addEvent, clearErrors, verifyLocation})(withStyles(styles)(AddEvent));
