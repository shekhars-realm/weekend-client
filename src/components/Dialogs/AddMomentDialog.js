import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Post from '../Moments/Post'
import MyButton from '../../utils/MyButton';
import $ from 'jquery'
//mui imports
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CameraAlt from '@material-ui/icons/CameraAlt';
//redux connects
import {connect} from 'react-redux';

const styles = theme => ({
  closeButton: {position: 'absolute', right: 0},
  dialogPaper: {width: 800, minHeight: 450}
})

class AddMomentDialog extends React.Component {
  state={
    open: false
  }
  handleClose = () => {
    this.setState({open: false})
    if(this.props.closePopup) this.props.closePopup()
  }
  handleOpen = () => {
    this.setState({open: true})
  }
  render () {
    const {classes} = this.props
    const {open} = this.state;
    return (
      <div>
        <Button style={{fontSize: 18}} variant="fab" color="default" onClick={() => this.handleOpen()}>
          Post a moment
        </Button>
        <Dialog
          open={open}
          classes={{paper: classes.dialogPaper}}
          onClose={() => {this.setState({open: false})}}
          fullScreen={$(window).width() < 600 ? true : false}
          aria-labelledby="alert-dialog-title"
          maxWidth='md'
          aria-describedby="alert-dialog-description"
        >

          <DialogContent style={{padding: 0}}>
            <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
              <CloseIcon color='secondary'/>
            </MyButton>
            <Post closePopup={this.props.closePopups}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AddMomentDialog.propTypes = {
  classes: PropTypes.object.isRequired
}

export default connect(null)(withStyles(styles)(AddMomentDialog));
