import React from 'react'
import PropTypes from 'prop-types'
import SmallMap from '../components/Maps/SmallMap'
import {Link} from 'react-router-dom';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
//redux imports
import {connect} from 'react-redux';
import {getEvent} from '../redux/actions/dataActions'

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
  }
})

class Event extends React.Component {

  componentDidMount = () => {
    this.props.getEvent(this.props.match.params.eventId);
  }

  componentDidUpdate(prevProp, prevState) {
    console.log(this.props);
  }

  render () {
    console.log(this.props);
    const {classes, loading, eventObj} = this.props
    const eventDetails = loading ? <CircularProgress size={200} thickness={2} className={classes.progressSpinner}/> : (
      <Grid container spacing={6}>
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
              </p>, with love
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
            <div className={classes.participants}>
              <p className={classes.subtitleText}>Gang</p>
              <Divider/>
              <div className={classes.participantsImg}>
              {
                eventObj.participants && eventObj.participants.map((participant) => {
                  return(
                    <Link to={'/profile/'+participant.user}>
                      <img alt={participant.user} title={participant.user} src={participant.userImage} className={classes.userImage}/>
                    </Link>
                  )
                })
              }
            </div>
            </div>
            <div className={classes.discussionPanel}>
              <p className={classes.subtitleText}>Discussions</p>
              <Divider/>
            </div>
          </div>
        </Grid>
        <Grid item sm={3} xs={12}></Grid>
      </Grid>
    )
    return <div style={{textAlign: 'center'}}>{eventDetails}</div>;
  }
}

Event.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired,
  getEvent: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  loading: state.UI.loading,
  eventObj: state.data.eventObj
})

export default connect(mapStateToProps, {getEvent})(withStyles(styles)(Event));
