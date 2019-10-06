import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import SmallMap from '../components/Maps/SmallMap'
import {Link} from 'react-router-dom';
import Post from '../components/Forum/Post'
import List from '../components/Forum/List'
import RollCall from '../components/Events/RollCall';
import DeleteEvent from '../components/Events/DeleteEvent'
import RemoveParticipant from '../components/Dialogs/RemoveParticipant';
import ShareEvent from '../components/Dialogs/ShareEvent';
import Navbar from '../components/Layout/Navbar'
//mui imports
import Snackbar from '@material-ui/core/Snackbar';
import Hidden from '@material-ui/core/Hidden';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
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
    fontSize: 40,
    fontWeight: 700,
  },
  distanceText: {
    fontSize: 30,
    fontWeight: 400
  },
  eventTime: {
    fontSize: 20,
    fontWeight: 600,
    background: theme.palette.secondary.main,
    color: 'white',
    borderRadius: 5,
    padding: '5px 0px 8px 0px',
    marginTop: 10
  },
  eventDescription: {
    fontSize: 20
  },
  userImage: {
    margin: 10,
    height: 50,
    objectFit: 'cover',
    width: 50,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  username: {
    color: theme.palette.secondary.main
  },
  eventOrganizer: {
    fontSize: 16,
    fontWeight: 400
  },
  participantsImg: {
    display: 'flex'
  },
  subtitleText: {
    fontSize: 20
  },
  participants: {
    margin: '30px 0px 10px 0px',
    display: 'block',
    textAlign: 'center'
  },
  actionButton: {
    width: '30%',
    margin: '10px 5px 0px 5px'
  },
  eventLocation: {
    textAlign: 'center',
    display: 'grid',
    marginTop: 10
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
      updateEvents: false,
      anchorEl: null,
      selectedParticipant: null,
      selectedParticipantImg: ''
    }
  }

  handleCloseAlert = () => {
    this.setState({alert: {}})
  }

  componentDidMount = () => {
    this.props.getEvent(this.props.match.params.eventId);
    console.log(this.props.match.params);
  }
  memberClicked = (user, userImage, event) => {
    if(this.props.eventObj.user === this.props.handle) {
      this.setState({
        anchorEl: event.currentTarget,
        selectedParticipant: user,
        selectedParticipantImg: userImage
      })
    } else {
      this.props.history.push('/profile/'+user)
    }
  }
  handleCloseMenu = () => {
    this.setState({
      anchorEl: null
    })
  }
  openParticipantProfile = () => {
    this.props.history.push('/profile/'+this.state.selectedParticipant)
  }
  render () {
    console.log(this.props);
    const {classes, loading, eventObj, handle, eventJoined, alert, eventParticipants} = this.props
    let checkParticipantStatus = eventParticipants.every(participant => {
           return participant.status !== undefined
         })
    console.log(checkParticipantStatus ,  eventParticipants.length > 0 , eventObj.user === handle, eventObj.endTime < new Date().toISOString());
    let showRollCall = !checkParticipantStatus &&  eventParticipants.length > 0 && eventObj.user === handle && eventObj.endTime < new Date().toISOString();
    const eventDetails = loading ? <CircularProgress color='secondary' size={100} thickness={2} className={classes.progressSpinner}/> : (
      <Grid container spacing={0}>
        <Hidden smDown>
          <Grid item sm={3}>
            <SmallMap location={eventObj.geoPoint}/>
          </Grid>
        </Hidden>
        <Grid item sm={6} xs={12}>
          <div className={classes.eventDetails}>
            <div className={classes.eventName}>
              <p>{eventObj.name}</p>
              <p className={classes.eventOrganizer}>
                {'created by '}
                <Link to={'/profile/'+eventObj.user}>
                  @{eventObj.user}
                </Link>
              </p>
            </div>
            <div className={classes.eventTime}>
              {new Date(eventObj.startTime).toLocaleString()}
            </div>
            <div className={classes.eventDescription}>
              {eventObj.description}
            </div>
            <Hidden mdUp>
              <div className={classes.eventLocation}>
                <span>at</span>
                  {
                    eventObj.geoPoint ? <a href={'https://maps.google.com/maps?z=10&t=m&q=loc:' + eventObj.geoPoint._latitude + '+' + eventObj.geoPoint._longitude} target="_blank">{
                      eventObj.address ? eventObj.address : 'Directions'
                    }</a> : null
                  }
              </div>
            </Hidden>
            {
              // eventObj.user === handle ? null : <Button className={classes.actionButton} color='secondary'>Report</Button>
            }
            {
              eventObj.user === handle && eventObj.startTime > new Date().toISOString() ? (
                <DeleteEvent eventId={eventObj.eventId} history={this.props.history}/>
              ) : (
                eventJoined ? <Button disabled={eventObj.startTime < new Date().toISOString()} className={classes.actionButton} variant='contained' color='secondary' onClick={() => {this.props.leaveEvent(eventObj.eventId)}}>Leave</Button> :
                <Button disabled={eventObj.startTime < new Date().toISOString()} className={classes.actionButton} variant='contained' color='secondary' onClick={() => {this.props.joinEvent(eventObj.eventId)}}>Join</Button>
              )
            }
            {
              eventObj.endTime > new Date().toISOString() ? <ShareEvent eventId={eventObj.eventId}/> : null
            }
            <div className={classes.participants}>
              <p className={classes.subtitleText}>
                Members
                {
                  showRollCall ? <RollCall participants={eventObj.participants} eventId={eventObj.eventId}/> : null
                }
              </p>
              <Divider/>
              <div className={classes.participantsImg}>
              {
                eventParticipants && eventParticipants.map((participant) => {
                  return(
                      <img onClick={(event) => {this.memberClicked(participant.user, participant.userImage, event)}} alt={participant.user} title={participant.user} src={participant.userImage} className={classes.userImage}/>
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
              {
                eventObj.endTime > new Date().toISOString() ? <Post eventId={eventObj.eventId}/> : null
              }
              <List showReplyForm={eventObj.endTime > new Date().toISOString() ? true : false} forumIdParam={this.props.match.params.forumId ? this.props.match.params.forumId : null}/>
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
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.openParticipantProfile}>Profile</MenuItem>
          {
            eventObj.startTime > new Date().toISOString() ? <MenuItem ><RemoveParticipant user={this.state.selectedParticipant} eventId={eventObj.eventId} userImage={this.state.selectedParticipantImg}/></MenuItem> : null
          }
        </Menu>
      </Grid>
    )
    return <Fragment>
      <Navbar/>
      <div style={{textAlign: 'center'}}>{eventDetails}</div>
    </Fragment>;
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
