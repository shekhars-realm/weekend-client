import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Rating from '@material-ui/lab/Rating';
import Tooltip from '@material-ui/core/Tooltip';

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
    error: ''
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    this.setState({open: false})
  }
  handleRating = (event, value) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSuggestion = (event) => {
    this.setState({
      suggestion: event.target.value
    })
  }
  handleSubmit = () => {
    const {fun, wellPlanned, interaction, suggestion} = this.state
    console.log(this.state);
    if(fun === 0 || wellPlanned === 0 || interaction === 0 || suggestion === '') {
      this.setState({error: 'Ratings cannot be 0(zero) and Suggestion cannot be empty!'})
    } else {
      this.setState({open: false})
    }
  }
  render() {
    const {classes} = this.props
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={this.state.open}
          fullWidth='sm'
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Your Feedback"}</DialogTitle>
          <DialogContent>
            <Grid className={classes.feedbackRow} container spacing={0}>
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
            <TextField
              fullWidth
              variant='outlined'
              multiline
              name='suggestion'
              value={this.state.suggestion}
              rows={3}
              margin='dense'
              placeholder='Give a suggestion to the organiser'
              label='Suggestion'
            />
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
      </div>
    );
  }
}

RateEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RateEvent)
