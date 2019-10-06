import React from 'react'
import PropTypes from 'prop-types'
import UploadMedia from './UploadMedia'
import SelectEvent from './SelectEvent'
import axios from 'axios'
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Paper from '@material-ui/core/Paper';
//redux imports
import {connect} from 'react-redux';
import {postMoment} from '../../redux/actions/momentActions'

const styles = theme => ({
  postMoment: {
    textAlign: 'center',
    padding: 10,
    boxShadow: 'none'
  },
  postButton: {
    position: 'absolute',
    bottom: 0,
    width: '94%',
    margin: '0px 0px 10px -47%'
  },
  heading: {
    fontWeight: 700
  },
  headingContainer: {
    display: 'flex'
  },
  uploadMedia: {
    height: 21
  },
  selectEvent: {
    display: 'flex',
    alignItems: 'baseline'
  },
  selectEventText: {
    fontWeight: 700
  },
  progress: {
    position: 'absolute'
  },
  noevents: {
    margin: 10
  }
})

class Post extends React.Component {
  state={
    momentText: '',
    files: [],
    eventObj: this.props.userObj.eventsForMedia.length > 0 ? this.props.userObj.eventsForMedia[0] : null
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  selectedEvent = (eventObj) => {
    this.setState({eventObj})
  }
  getFiles = (files) => {
    this.setState({files})
  }
  postMoment = () => {
    const body = {
      ...this.state,
      user: this.props.userObj.handle,
      userImage: this.props.userObj.imageUrl
    }
    console.log(body);
    this.props.postMoment(body);
    this.setState({
      momentText: '',
      files: []
    })
  }
  render () {
    const {classes, userObj, uploading} = this.props;
    const postButtonDisabled = (this.state.files.length > 0) && userObj.eventsForMedia.length > 0 ? false : true
    return(
      <Paper className={classes.postMoment}>
        <div className={classes.headingContainer}>
          <Typography className={classes.heading} variant='h5' color='default'>Add moments..</Typography>
        </div>
        {
          userObj.eventsForMedia.length > 0 ? <div className={classes.selectEvent}>
            <Typography className={classes.selectEventText} variant='body2' color='secondary'>Select event</Typography>
            <SelectEvent events={userObj.eventsForMedia} selectedEvent={this.selectedEvent}/>
          </div> : <Typography className={classes.noevents} variant='body2' color='secondary'>Create/join events to add your moments!</Typography>
        }
        <TextField
          fullWidth
          name='momentText'
          variant='outlined'
          label='Your best moment'
          type='text'
          multiline
          rows={2}
          value={this.state.momentText}
          onChange={this.handleChange}
        />

        <div className={classes.uploadMedia}>
          <UploadMedia sendFiles={this.getFiles}/>
        </div>
        <br/>
        <br/>
        <Button disabled={postButtonDisabled || uploading} className={classes.postButton} variant='contained' color='secondary' onClick={() => this.postMoment()}>
        Post
        {
          uploading && (
            <CircularProgress size={30} className={classes.progress}/>
          )
        }
        </Button>
      </Paper>
    )
  }
}

Post.propTypes = {
  classes: PropTypes.object.isRequired,
  userObj: PropTypes.object.isRequired,
  uploading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  userObj: state.user.credentials,
  uploading: state.moment.uploading
})

export default connect(mapStateToProps, {postMoment})(withStyles(styles)(Post));
