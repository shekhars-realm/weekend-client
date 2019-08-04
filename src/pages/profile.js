import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';
//mui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
//components imports
import Profile from '../components/Profile/Profile';
import PostWrite from '../components/WriteAbout/PostWrite';
import EventCard from '../components/Events/EventCard';
import EventListSkeleton from '../components/Skeletons/EventListSkeleton';
import Schedule from '../components/Profile/Schedule'
import AddEvent from '../components/Events/AddEvent';
//redux imports
import { connect } from 'react-redux';
import {getUserEvents} from '../redux/actions/dataActions';

function init() {
  $('.eventCard').mouseover(function() {
    $(this).finc('.actionBtn').show()
  }).mouseout(function() {
    $(this).finc('.actionBtn').hide()
  })
}

const styles = theme => ({
  root: {
    height: '90vh',
    overflowX: 'auto',
  },
  heading: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 700
  },
  noEvents: {
    textAlign: 'center',
    padding: 20
  },
  noEventsText: {
    fontSize: 20,
    fontWeight: 700,
  }
})

class profile extends Component {
  constructor(props) {
    super(props)
    this.state= {
      handle: this.props.match.params.handle
    }
  }
  componentDidMount() {
    this.props.getUserEvents(this.state.handle)
  }
  componentDidUpdate(prevProp, prevState) {
    if(this.props.match.params.handle !== prevProp.match.params.handle) {
      this.setState({handle: this.props.match.params.handle})
      this.props.getUserEvents(this.props.match.params.handle)
    }
  }
  render() {
    const {classes,events, loadingData, loadedHandle, sameUserLoaded, handle} = this.props
    const eventList = loadingData ? <EventListSkeleton/> : (
      <Paper className={classes.root}>
        <div className={classes.heading}>
          {
            sameUserLoaded ? "Your events" : loadedHandle+"'s events"
          }
        </div>
      {events.length === 0 ? (
        <div className={classes.noEvents}>
          {
            sameUserLoaded ? <p className={classes.noEventsText}>
              You haven't created any event by now<br/>
            Add Event <AddEvent/>
        </p> : <p className={classes.noEventsText}>
          {
            "Looks like "+loadedHandle+" is not much of an organiser!"
          }
        </p>
          }
        </div>
      ) : (
        events.map((event) => {
          return (
            <div class='eventCard'>
              <EventCard event={event}/>
              <button
                onClick={() => {this.props.history.push(`/event/${event.eventId}`)}} variant="contained"
                class="actionBtn infoBtn"
              >
                Info
              </button>
              <button
                variant="contained"
                class="actionBtn getinBtn"
              >
                lets go
              </button>
            </div>
          )
        })
      )}
    </Paper>
    )
    return (
      <Grid container spacing={6}>
        <Grid item sm={1} xs={12}/>
        <Grid item sm={3} xs={12}>
          <Profile history={this.props.history} handle={this.state.handle}/>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Schedule/>
        </Grid>
        <Grid item sm={3} xs={12}>
          {eventList}
        </Grid>
        <Grid item sm={1} xs={12}/>
      </Grid>
    );
  }
}

profile.propTypes = {
  events: PropTypes.array.isRequired,
  loadingData: PropTypes.bool.isRequired,
  getUserEvents: PropTypes.func.isRequired,
  handle: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  events: state.data.events,
  loadingData: state.data.loading,
  handle: state.user.credentials.handle,
  loadedHandle: state.user.loadedUser.handle,
  sameUserLoaded: state.user.sameUserLoaded
});

export default connect(mapStateToProps, {getUserEvents})(withStyles(styles)(profile));
