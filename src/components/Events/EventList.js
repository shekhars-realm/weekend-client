import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import EventCard from './EventCard';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from '@material-ui/icons/Error'
//mui import
import {withStyles} from '@material-ui/core/styles';
//redux imports
import {connect} from 'react-redux'

import moment from 'moment';
import _ from 'lodash'

const styles = theme => ({
  noEventsText: {
    fontSize: 20,
    fontWeight: 700,
  },
  errorIcon: {
    color: 'dodgerblue',
    fontSize: 80
  },
  noEvents: {
    textAlign: 'center',
    padding: '20%'
  }
})

class EventList extends React.Component {
  render () {
    const {events, loading, classes} = this.props
    return(
      <Fragment>
      {
        loading ? (
          <CircularProgress size={100} thickness={2} className={classes.progressSpinner}/>
        ) : (
          events.length === 0 ?
            <div className={classes.noEvents}>
              <Error className={classes.errorIcon}/>
              <Typography variant='h5'>No events found</Typography>
                {
                  this.props.sameUserLoaded ? <Typography variant='body1'></Typography> : null
                }
            </div> : (
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
        )
      }
      </Fragment>
    )
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loading: state.data.loading,
  events: state.data.locations
})

export default connect(mapStateToProps)(withStyles(styles)(EventList));
