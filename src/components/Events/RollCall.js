import React from 'react'
import PropTypes from 'prop-types'
import MemberCard from './MemberCard'
import _ from 'lodash';
//mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({

})

class RollCall extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      open: false,
      participants: []
    }
  }
  handleOpen = () => {
    this.setState({
      open: true
    })
  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  isParticipantArrayEqual = (x, y) => {
    return _(x).differenceWith(y, _.isEqual).isEmpty();
  };
  componentDidMount() {
    console.log('mounted');
    this.setState({
      participants: this.props.participants
    })
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps.participants, this.props.participants, this.state.participants);
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldUpdate called', nextProps.eventParticipants, this.state.participants, this.isParticipantArrayEqual(nextProps.eventParticipants, this.state.participants));
  //   return _.isEqual(nextProps.eventParticipants, this.props.eventParticipants)
  // }
  render () {
    console.log('new array: ', this.props.participants);
    const {classes, participants} = this.props;
  return (
    <div>
      <Button style={{margin: 10}} onClick={this.handleOpen} variant='contained' color='primary'>RollCall</Button>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        scroll={'body'}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">
          {'Roll-Call'}
          <br/>
          <Typography variant='caption'>Mark the participants who were actually  present in this event to get reviews.</Typography>
        </DialogTitle>
        <DialogContent>
          {
            participants.map(participant => {
              return (
                <MemberCard eventId={this.props.eventId} participant={participant} updateStatus={this.updateStatus}/>
              )
            })
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
  }
}

RollCall.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RollCall);
