import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
//redux imports
import {connect} from 'react-redux';
import {deleteNotification} from '../../redux/actions/userActions';

const styles = theme => ({
  feedbackRow: {
    marginBottom: 20
  }
})

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function IconContainer(props) {
  const { value, ...other } = props;
  return (
    <Tooltip title={labels[value] || ''}>
      <div {...other} />
    </Tooltip>
  );
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

class RateEvent extends React.Component {
  state={
    open: false,
    wellPlanned: 0,
    interaction: 0,
    fun: 0,
    suggestion: '',
    error: '',
    eventId: this.props.not.eventId,
    notificationId: this.props.not.notificationId,
    openAlert: false,
    checked: false
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleCheckBox = () => {
    this.setState({checked: !this.state.checked})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  handleRating = (event, value) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleChange = (event) => {
    this.setState({suggestion: event.target.value})
  }
  handleSuggestion = (event) => {
    this.setState({
      suggestion: event.target.value
    })
  }
  handleSubmit = () => {
    const {fun, wellPlanned, interaction, suggestion, eventId, notificationId} = this.state
    if(fun === 0 || wellPlanned === 0 || interaction === 0) {
      this.setState({error: 'Ratings cannot be 0(zero) and Suggestion cannot be empty!'})
    } else if(!this.state.checked) {
      this.setState({
        error: 'Click on the checkbox to proceed!'
      })
    } else {
      const rating = {
        fun, interaction, wellPlanned, suggestion, eventId, notificationId
      }
      axios.post('/event/rating', rating).then(res => {
        this.setState({open: false, openAlert: true, error: ''})
        this.props.deleteNotification(notificationId);
      }).catch(err => {
        this.setState({error: 'Something went wrong! Try again later.'})
      })
    }
  }
  handleCloseAlert = () => {
    this.setState({openAlert: false})
  }
  render() {
    const {classes, not} = this.props;
    const time = dayjs(not.startTime).fromNow();
    return (
      <div>
        <Typography
          color="default"
          variant="body1"
          onClick={this.handleOpen}
        >
          {`${not.sender} needs your feedback!`}
        </Typography>
        <Dialog
          open={this.state.open}
          fullWidth='sm'
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Your Feedback'}</DialogTitle>
          <DialogContent>
            <Grid className={classes.feedbackRow} container spacing={0}>
              <Grid item sm={2} xs={3}>Event: </Grid>
              <Grid item sm={10} xs={9}>{not.eventName}</Grid>
              <br/>
              <Grid item sm={2} xs={3}>Organiser: </Grid>
              <Grid item sm={10} xs={9}><Link to={'/profile/'+not.sender}>{not.sender}</Link></Grid>
              <br/>
              <Grid item sm={2} xs={3}>Date: </Grid>
              <Grid item sm={10} xs={9}>{moment(not.startTime).format('LLLL')}</Grid>
              <Grid item sm={12} xs={12}><Divider style={{margin: '5px 0px 5px 0px'}}/></Grid>
              <Grid item sm={4}>
                <Typography color='primary'>How much fun did you had?</Typography>
              </Grid>
              <Grid item sm={8}>
                <Rating
                  name="fun"
                  value={this.state.fun}
                  precision={0.5}
                  IconContainerComponent={IconContainer}
                  onChange={this.handleRating}
                />
                <Typography variant='caption' component="legend">The rating should define the quallity of time you spent in there.</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.feedbackRow} container spacing={0}>
              <Grid item sm={4}>
                <Typography color='primary'>How well planned the event was?</Typography>
              </Grid>
              <Grid item sm={8}>
                <Rating
                  name="wellPlanned"
                  value={this.state.wellPlanned}
                  precision={0.5}
                  IconContainerComponent={IconContainer}
                  onChange={this.handleRating}
                />
                <Typography variant='caption' component="legend">Well planned event is the one where you dont have any surprises that might ruin things.</Typography>
              </Grid>
            </Grid>
            <Grid className={classes.feedbackRow} container spacing={0}>
              <Grid item sm={4}>
                <Typography color='primary'>How interactive was the event?</Typography>
              </Grid>
              <Grid item sm={8}>
                <Rating
                  name="interaction"
                  value={this.state.interaction}
                  precision={0.5}
                  IconContainerComponent={IconContainer}
                  onChange={this.handleRating}
                />
                <Typography variant='caption' component="legend">Were you able to make new friends?</Typography>
              </Grid>
            </Grid>
            {
              // <TextField
              //   fullWidth
              //   variant='outlined'
              //   multiline
              //   name='suggestion'
              //   value={this.state.suggestion}
              //   rows={3}
              //   margin='dense'
              //   onChange={this.handleChange}
              //   placeholder='Give a suggestion to the organiser'
              //   label='Suggestion'
              // />
            }
            <Typography variant='caption'>
              <Checkbox
                checked={this.state.checked}
                onChange={this.handleCheckBox}
                value={this.state.checked}
                color="primary"
              />
              You cannot change the following ratings! Make sure these are suitable.
            </Typography>
            <br/>
            {
              this.state.error !== '' && <Typography variant='caption' color='primary'>{this.state.error}</Typography>
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Later
            </Button>
            <Button variant='contained' onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={`top,right`}
          open={this.state.openAlert}
          onClose={this.handleCloseAlert}
          autoHideDuration={2000}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Your feedback has been noted!</span>}
        />
      </div>
    );
  }
}

RateEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteNotification: PropTypes.func.isRequired
}

export default connect(null, {deleteNotification})(withStyles(styles)(RateEvent))
