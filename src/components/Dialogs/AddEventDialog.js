import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import AddEvent from '../Events/AddEvent'
//mui imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import WifiTethering from '@material-ui/icons/WifiTethering';
//redux connects
import {connect} from 'react-redux';
import {removeUserFromEvent} from '../../redux/actions/dataActions';

class AddEventDialog extends React.Component {
  state={
    open: false
  }
  render () {
    const {open} = this.state;
    return (
      <div>
        <Hidden mdUp>
          <Button style={{fontSize: 20}} variant="fab" color="default" onClick={() => {this.setState({open: true})}}>
            <WifiTethering/>
          </Button>
        </Hidden>
        <Hidden smDown>
          <Button variant="fab" color="default" style={{position: 'absolute'}} onClick={() => {this.setState({open: true})}}>
            <WifiTethering/>
          </Button>
        </Hidden>
        <Dialog
          open={open}
          onClose={() => {this.setState({open: false})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <AddEvent/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AddEventDialog.propTypes = {

}

export default connect(null)(AddEventDialog);
