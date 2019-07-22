import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import TagSuggestions from  '../../utils/TagSuggestions'
//Muiimports
import 'date-fns';
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
import {addEvent,clearErrors} from '../../redux/actions/dataActions';

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
});

class AddEvent extends Component {
  state={
    open: false,
    eventAdded: false,
    name: '',
    description: '',
    tags: [],
    startTime: new Date().toISOString(),
    endTime: new Date(new Date().getTime() + 1800000).toISOString(),
    location: {
      lat: 49.438845,
      lng: 7.744389
    },
    headCount: 0,
    errors: {}
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
        location: {
          lat: 49.438845,
          lng: 7.744389
        },
        headCount: 0,
        errors: {}
      })
    }
  }
  handleOpen = () => {
    this.setState({open: true})
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
      tags: this.state.tags,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
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
    const {classes, UI: {loading}} = this.props;
    return (
      <Fragment>
        <MyButton tip='Add Event' onClick={this.handleOpen}>
          <AddIcon color='primary'/>
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
                  rows="4"
                  placeholder= 'Description'
                  margin="normal"
                  variant="outlined"
                  />
                  <TagSuggestions errors={this.state.errors} selectedTags={this.selectedTags} classes={classes}/>
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
                      error={this.state.errors.location ? true : false}
                      helperText={this.state.errors.location}
                    />
                    <Divider style={{margin: 20}}/>
                    <Button variant='contained' color='primary' onClick={this.getUserLocation}>{'My Location'}</Button>
                    <Divider style={{margin: 20}}/>
                    <Button variant='contained' color='primary' onClick={() =>{this.setState({openMap: true})}}>{'Use Maps'}</Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin="normal"
                      id="mui-pickers-date"
                      label="Date"
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
                  <TextField
                  id="outlined-multiline-static"
                  label="Head Count"
                  name='headCount'
                  value={this.state.description}
                  onChange={this.handleChange}
                  fullWidth
                  placeholder= 'Number of people you want in!'
                  margin="normal"
                  variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button type='submit' variant='contained' color='primary' className={classes.submitButton} disabled={loading}>
                Submit
                {loading && <CircularProgress size={30} className={classes.progressSpinner}/>}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <Dialog
          open={this.state.eventAdded}
          onClose={()=> {this.setState({eventAdded: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your event has been added!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Alright then, we have added your event. Get to the meeting point on time and don't be a snail!"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=> {this.setState({eventAdded: false})}} color="primary" autoFocus>
              Alright!
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

AddEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  addEvent: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(mapStateToProps, {addEvent, clearErrors})(withStyles(styles)(AddEvent));
