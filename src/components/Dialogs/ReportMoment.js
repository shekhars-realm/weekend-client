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
import {deleteMoment} from '../../redux/actions/deleteMoment';

class DeleteMoment extends React.Component {
  state={
    open: false,
    loading: false,
    error: ''
  }
  handleDeleteMoment = () => {

  }
  render () {
    const {user} = this.props;
    const {open, loading, error} = this.state;
    return (
      <div>
        <Typography variant="body1" color="default" onClick={() => {this.setState({open: true})}}>
          Report
        </Typography>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Block user"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`We are currently working on this feature. It will be available soon!`}
              <br/>
            </DialogContentText>
            <Typography variant='caption' color='primary'>{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {this.setState({open: false})}} color="primary">
              Alright
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteMoment.propTypes = {
  removeUserFromEvent: PropTypes.func.isRequired
}

export default connect(null, {removeUserFromEvent})(DeleteMoment);
