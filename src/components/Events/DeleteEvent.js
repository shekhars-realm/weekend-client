import React from 'react';
import axios from 'axios';
//nui imports
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteEvent extends React.Component {

  state={
    open: false,
    error: '',
    loadingDelete: false
  }

  handleOpen = () =>{
    this.setState({open: true, error: ''})
  }

  deleteEvent = () => {
    this.setState({loadingDelete: true})
    axios.delete(`/event/${this.props.eventId}`).then(res => {
      this.setState({
        open: false
      })
      this.props.history.push('/')
    }).catch(err => {
      console.log(err);
      this.setState({
        error: err.code
      })
    })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    return (
      <div>
        <Button style={{
          width: '30%',
          marginTop: 30
        }} color="secondary" onClick={this.handleOpen}>
          Delete
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete this event?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {'The event will be automatically removed from the chedule of all its members.'}
            </DialogContentText>
          </DialogContent>
          {
            this.state.error !== '' ? <Typography color='primary' variant='body6'>{this.state.error}</Typography> : null
          }
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={this.state.loadingDelete} onClick={this.deleteEvent} color="primary" variant='contained'>
              Delete
              {
                this.state.loadingDelete && (
                  <CircularProgress size={30} style={{position: 'absolute'}}/>
                )
              }
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default DeleteEvent
