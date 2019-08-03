import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import $ from 'jquery';
//mui imports
import Grid from '@material-ui/core/Grid';
//components imports
import Profile from '../components/Profile/Profile';
import PostWrite from '../components/WriteAbout/PostWrite';
import EventCard from '../components/Events/EventCard';
import EventListSkeleton from '../components/Skeletons/EventListSkeleton';
import Schedule from '../components/Profile/Schedule'
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

class profile extends Component {
  componentDidMount() {
    this.props.getUserEvents('user')
  }
  render() {
    const {events, loadingData, handle} = this.props
    const eventList = loadingData ? <EventListSkeleton/> : (
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
    )
    return (
      <Grid container spacing={6}>
        <Grid item sm={1}/>
        <Grid item sm={3} xs={12}>
          <Profile/>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Schedule/>
        </Grid>
        <Grid item sm={3} xs={12}>
          {eventList}
        </Grid>
        <Grid item sm={1}/>
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
  handle: state.user.credentials.handle
});

export default connect(mapStateToProps, {getUserEvents})(profile);
