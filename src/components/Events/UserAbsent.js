import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';
//mui imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class UserAbsent extends React.Component {
  state={
    open: false
  }
  render () {
    const {not} = this.props;
    const {open} = this.state;
    return (
      <div>
        <Typography variant="body2" color="default" onClick={() => {this.setState({open: true})}}>
          You were absent in an event!
        </Typography>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Marked as Absent!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`${not.sender} marked you as absent in the following event: `}
              <br/>
              <Typography variant='body1' color='primary'>{not.eventName}</Typography>
              <br/>
              <Typography variant='body2' color='default'>on {moment(not.startTime).format('LLLL')}</Typography>
              <br/>
              Please make sure to unsubscribe the event in case there are chance to miss it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({open: false})}} color="primary" autoFocus>
              Alright!
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserAbsent;
