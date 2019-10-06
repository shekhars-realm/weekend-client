import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    height: 50,
    margin: 5
  },
  progressSpinner: {
    position: 'absolute'
  }
})


class SendEvent extends React.Component {
  state={
    sending: false,
    sent: false,
    error: ''
  }
  sendEvent = () => {
    this.setState({
      sending: true
    })
    axios.get(`/event/share/${this.props.eventId}/${this.props.user}`).then(res => {
      this.setState({
        sending: false,
        sent: true
      })
    }).catch(err => {
      this.setState({
        sending: false,
        error: 'Something went wrong!'
      })
    })
  }
  deleteAlert = () => {
    this.setState({
      error: ''
    })
  }
  render () {
    const {classes, user} = this.props
    return(
      <div className={classes.container}>
        <Typography style={{float: 'left'}} className={classes.userName} variant='body1' color='primary'>{user}</Typography>
        <Button style={{float: 'right'}} className={classes.sendEvent} disabled={this.state.sending || this.state.sent} variant='contained' onClick={() => this.sendEvent()} color='secondary'>
        {
          this.state.sent ? 'Sent' : 'Send'
        }
        {
          this.state.sending ? <CircularProgress size={20} thickness={2} className={classes.progressSpinner}/> : null
        }
        </Button>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.error !== ''}
          autoHideDuration={2000}
          onClose={this.deleteAlert}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.state.error}</span>}
        />
      </div>
    )
  }
}

SendEvent.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SendEvent);
