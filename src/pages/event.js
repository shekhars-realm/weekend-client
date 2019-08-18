import React from 'react'
import PropTypes from 'prop-types'
import SmallMap from '../components/Maps/SmallMap'
import {Link} from 'react-router-dom';
import Post from '../components/Forum/Post'
import List from '../components/Forum/List'
import RollCall from '../components/Events/RollCall';
import DeleteEvent from '../components/Events/DeleteEvent'
//mui imports
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
//redux imports
import {connect} from 'react-redux';
import {getEvent, joinEvent, leaveEvent, deleteAlert} from '../redux/actions/dataActions'

const styles = (theme) => ({
  progressSpinner: {

  },
  eventDetails: {
    width: '100%',
    textAlign: 'center'
  },
  eventName: {
    fontSize: 60,
    fontWeight: 700,
  },
  distanceText: {
    fontSize: 30,
    fontWeight: 400
  },
  eventTime: {
    fontSize: 30,
    fontWeight: 600,
    background: theme.palette.primary.main,
    color: 'white',
    borderRadius: 5,
    padding: '5px 0px 8px 0px',
    marginTop: 30
  },
  eventDescription: {
    fontSize: 40
  },
  userImage: {
    margin: 10,
    height: 50,
    objectFit: 'cover',
    width: 50,
    borderRadius: '50%'
  },
  username: {
    color: theme.palette.primary.main
  },
  eventOrganizer: {
    float: 'right',
    display: 'flex'
  },
  participantsImg: {
    display: 'flex'
  },
  subtitleText: {
    color: theme.palette.primary.main,
    fontSize: 30
  },
  participants: {
    marginTop: 30
  },
  actionButton: {
    width: '30%',
    marginTop: 30
  }
})

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

class Event extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      alert:{},
      locations: this.props.locations,
      updateEvents: false
    }
  }

  handleCloseAlert = () => {
    this.setState({alert: {}})
  }

  componentDidMount = () => {
    this.props.getEvent(this.props.match.params.eventId);
    console.log(this.props.match.params);
  }


  render () {
    console.log(this.props);
    const {classes, loading, eventObj, handle, eventJoined, alert, eventParticipants} = this.props
    const eventDetails = loading ? <CircularProgress size={200} thickness={2} className={classes.progressSpinner}/> : (
      <Grid container spacing={0}>
        <Grid item sm={3} xs={12}>
          <SmallMap location={eventObj.geoPoint}/>
        </Grid>
        <Grid item sm={6} xs={12}>
          <div className={classes.eventDetails}>
            <div className={classes.eventName}>
              {eventObj.name}
              <span className={
              classes.distanceText
              }>, 3 Kms</span>
            </div>
            <div className={classes.eventOrganizer}>
              created by:
              <p className={classes.username}>
                <Link to={'/profile/'+eventObj.user}>
                  @{eventObj.user}
                </Link>
              </p>
              {
                //<img src={eventObj.userImage} className={classes.userImage}/>
              }
            </div>
            <div className={classes.eventTime}>
              {new Date(eventObj.startTime).toLocaleString()}
            </div>
            <div className={classes.eventDescription}>
              {eventObj.description}
            </div>
            {
              eventObj.user === handle ? (
                <DeleteEvent eventId={eventObj.eventId} history={this.props.history}/>
              ) : (
                eventJoined ? <Button className={classes.actionButton} variant='contained' color='primary' onClick={() => {this.props.leaveEvent(eventObj.eventId)}}>Leave</Button> :
                <Button className={classes.actionButton} variant='contained' color='secondary' onClick={() => {this.props.joinEvent(eventObj.eventId)}}>Join</Button>
              )
            }
            <div className={classes.participants}>
              <p className={classes.subtitleText}>
                Members
                {
                  eventObj.endTime < new Date().toISOString() && eventObj.user === handle ?
                  <RollCall eventParticipants={eventParticipants}/> : null
                }
              </p>
              <Divider/>
              <div className={classes.participantsImg}>
              {
                eventParticipants && eventParticipants.map((participant) => {
                  return(
                    <Link to={'/profile/'+participant.user}>
                      <img alt={participant.user} title={participant.user} src={participant.userImage} className={classes.userImage}/>
                    </Link>
                  )
                })
              }
              {
                eventParticipants.length === 0 && <Typography variant='body5'>No members yet</Typography>
              }
            </div>
            </div>
            <div className={classes.discussionPanel}>
              <p className={classes.subtitleText}>Forum</p>
              <Divider/>
              <Post eventId={eventObj.eventId}/>
              <List forumIdParam={this.props.match.params.forumId ? this.props.match.params.forumId : null}/>
            </div>
          </div>
        </Grid>
        <Grid item sm={3} xs={12}></Grid>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={alert !== ''}
          autoHideDuration={2000}
          onClose={this.props.deleteAlert}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{alert}</span>}
        />
      </Grid>
    )
    return <div style={{textAlign: 'center'}}>{eventDetails}</div>;
  }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  handle: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
  joinEvent: PropTypes.func.isRequired,
  leaveEvent: PropTypes.func.isRequired,
  eventJoined: PropTypes.bool.isRequired,
  deleteAlert: PropTypes.func.isRequired,
  eventParticipants: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  eventObj: state.data.eventObj,
  alert: state.data.alert,
  handle: state.user.credentials.handle,
  eventJoined: state.data.eventJoined,
  eventParticipants: state.data.eventParticipants
})

export default connect(mapStateToProps, {getEvent, leaveEvent, joinEvent, deleteAlert})(withStyles(styles)(Event));
