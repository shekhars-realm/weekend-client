import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//redux connects
import {connect} from 'react-redux';
import {removeUserFromEvent} from '../../redux/actions/dataActions';

class RemoveParticipant extends React.Component {
  state={
    open: false,
    loading: false,
    error: ''
  }
  handleRemoveParticipant = () => {
    const {user, userImage, eventId} = this.props
    axios.post('/event/RemoveParticipant', {
      user, userImage, eventId
    }).then(res => {
      console.log(this.props);
      this.props.removeUserFromEvent(user)
      this.setState({open: false, loading: false, error: ''})
    }).catch(err => {
      this.setState({
        err: 'Something went wrong. Please try again later!'
      })
    })
  }
  render () {
    const {user} = this.props;
    const {open, loading, error} = this.state;
    return (
      <div>
        <Typography variant="body1" color="default" onClick={() => {this.setState({open: true})}}>
          Remove
        </Typography>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Remove " + user + " from this event?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Removing an user from an event will <b>permanently block</b> that user from viewing/joining that event
              <br/>
              <br/>
              {"Are you sure about removing " + user + "?"}
            </DialogContentText>
            <Typography variant='caption' color='primary'>{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({open: false})}} color="primary">
              Cancel
            </Button>
            <Button disabled={loading} variant='contained' onClick={this.handleRemoveParticipant} color="primary">
              Remove
              {
                loading && (
                  <CircularProgress size={30} className='inBtnProgress'/>
                )
              }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

RemoveParticipant.propTypes = {
  removeUserFromEvent: PropTypes.func.isRequired
}

export default connect(null, {removeUserFromEvent})(RemoveParticipant);
