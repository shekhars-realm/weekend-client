import React from 'react';
import dayjs from 'dayjs';
//mui imports
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class EventDeleted extends React.Component {
  state={
    open: false
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  handleClose = () => {
    console.log('close called!');
    this.setState({
      open: false
    })
  }
  render() {
    const {not} = this.props;
    const time = dayjs(not.createdAt).fromNow();
    return (
      <div>
        <Typography
          color="default"
          variant="body1"
          onClick={this.handleOpen}
        >
          {'An event has been deleted '} {time}
        </Typography>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'An upcoming event has been deleted!'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`An upcoming event ${not.eventName} at ${not.startTime} has been deleted by the organiser`}
              <br/>
              {'We are sorry for the inconvenience!'}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default EventDeleted
