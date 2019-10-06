import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import SendEvent from './SendEvent'
import MyButton from '../../utils/MyButton';
import $ from 'jquery'

//mui imports
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//redux
import {connect} from 'react-redux'

const styles = theme => ({
  actionButton: {
    width: '30%',
    margin: '10px 5px 0px 5px'
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
})

class ShareEvent extends React.Component {
  state={
    users: this.props.following ? this.props.following : [],
    open: false
  }
  componentDidMount() {

  }
  handleClose = () => {
    this.setState({
      open: false
    })
  }
  handleSearchUser = (event) => {
    let users = this.props.following.filter(user => {
      return user.includes(event.target.value)
    })
    this.setState({
      users
    })
  }
  render () {
    const {classes, following} = this.props
    return(
      <div>
        <Button className={classes.actionButton} onClick={() => {this.setState({open: true})}} variant='contained' color='secondary'>Share</Button>
        <Dialog fullScreen={$(window).width() < 600 ? true: false} onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.open}>
          <DialogTitle id="simple-dialog-title">Share with...</DialogTitle>
          <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color='secondary'/>
          </MyButton>
          <DialogContent>
            <TextField
              variant='outlined'
              type='search'
              label='Search user'
              onChange={(event) => this.handleSearchUser(event)}
              fullWidth
            />
            {
              this.state.users.length > 0 ? this.state.users.map(val => {
                return <SendEvent eventId={this.props.eventId} user={val}/>
              }): <Typography variant='body2' color='primary'>You are not following anyone.</Typography>
            }
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  following: state.user.credentials.following
})

ShareEvent.propTypes = {
  following: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(ShareEvent));
