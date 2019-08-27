import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import EventCard from './EventCard';
//mui import
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  noEvents: {
    textAlign: 'center',
    padding: 20
  },
  noEventsText: {
    fontSize: 20,
    fontWeight: 700,
  }
})

class EventList extends React.Component {
  render () {
    const {events, classes} = this.props
    return(
      <Fragment>
      {events.length === 0 ?
        <div className={classes.noEvents}>
            <p className={classes.noEventsText}>
                "No events found nearby"<br/>
              Click on the button above to search!
          </p>
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
        )}
      </Fragment>
    )
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventList);
