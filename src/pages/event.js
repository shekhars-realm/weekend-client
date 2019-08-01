import React from 'react'
import PropTypes from 'prop-types'
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    margin: 5
  },
  eventDescription: {
    fontSize: 40
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
    const {classes, loading, eventObj} = this.props
    const eventDetails = loading ? <CircularProgress size={200} thickness={2} className={classes.progressSpinner}/> : (
      <div className={classes.eventDetails}>
        <div className={classes.eventName}>
          {eventObj.name}
          <span className={
          classes.distanceText
          }>, 3 Kms</span>
        </div>
        <div className={classes.eventTime}>
          {new Date(eventObj.startTime).toLocaleString()}
        </div>
        <div className={classes.eventDescription}>
          {eventObj.description}
        </div>
      </div>
    )
    return (
      <Grid container spacing={6}>
        <Grid item sm={3}></Grid>
        <Grid item sm={6}>
          {eventDetails}
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid>
    )
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
