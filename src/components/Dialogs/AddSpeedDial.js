import React from 'react';
import PropTypes from 'prop-types'
import AddMomentDialog from './AddMomentDialog';
import AddEvent from '../Events/AddEvent';
import $ from 'jquery';
import {Redirect} from 'react-router-dom'
//mui imports
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import {connect} from 'react-redux'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    boxShadow: 'unset'
  },
  speedDial: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
  dialogPaper: {
  position: 'absolute',
  margin: 0,
  bottom: 0,
  width: '100%'
}
})

class AddSpeedDial extends React.Component {
  state={
    open: false
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if((this.props.eventAdded !== prevProps.eventAdded || this.props.momentUploaded !== prevProps.momentUploaded) && this.state.open) {
      this.setState({
        open: false
      })
    }
  }
  render() {
    const {classes, eventAdded, momentUploaded} = this.props
    return (
      <div className={classes.root}>
        <Hidden mdUp>
          <Button style={{boxShadow: 'none'}} variant='contained' color='primary' onClick={() => {this.setState({open: true})}}><AddCircleOutline/></Button>
        </Hidden>
        <Hidden smDown>
          <Fab style={{position: 'fixed', bottom: 50, right: 50}} variant='contained' color='secondary' onClick={() => {this.setState({open: true})}}><AddCircleOutline/></Fab>
        </Hidden>
        <Dialog
          classes={{paper: classes.dialogPaper}}
          open={this.state.open}
          TransitionComponent={Transition}
          onClose={() => {this.setState({open: true})}}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent onClick={() => this.handleClose} style={{padding: 0, textAlign: 'center'}}>
            <AddEvent closePopup={this.handleClose}/>
            <AddMomentDialog closePopup={this.handleClose}/>
            <Typography fullWidth onClick={() => {this.setState({open: false})}} variant='body1' color='secondary'>CANCEL</Typography>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

AddSpeedDial.propTypes = {
  classes: PropTypes.object.isRequired,
  eventAdded: PropTypes.bool.isRequired,
  momentUploaded: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  eventAdded: state.data.eventAdded,
  momentUploaded: state.moment.momentUploaded
})

export default connect(mapStateToProps)(withStyles(styles)(AddSpeedDial))
