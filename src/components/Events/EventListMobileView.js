import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import EventCardMobile from './EventCardMobile';
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from '@material-ui/icons/Error'
//mui import
import {withStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
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
  },
  subHeader: {
    fontSize: 18,
    color: theme.palette.primary.main,
    textAlign: 'center',
    padding: 10,
    lineHeight: '13px',
    background: 'whitesmoke'
  },
  progressSpinner: {
    position: 'absolute',
    left:'37%',
    top: '40%'
  }
})

class EventListMobileView extends React.Component {
  render () {
    const {events, loading, classes} = this.props
    return(
      <Fragment>
      {
        loading ? (
          <CircularProgress color='secondary' size={100} thickness={2} className={classes.progressSpinner}/>
        ) : (
          Object.keys(events).length === 0 ?
            <div className={classes.noEvents}>
              <Error className={classes.errorIcon}/>
              <Typography variant='h5'>No events found</Typography>
                {
                  this.props.sameUserLoaded ? <Typography variant='body1'></Typography> : null
                }
            </div> : (
              Object.keys(events).map(key => {
                console.log(key);
                return(
                    <ul>
                      <ListSubheader className={classes.subHeader}>{moment(parseInt(key)).format('dddd, MMMM Do')}</ListSubheader>
                      {events[key].map((event, index) => (
                        <ListItem style={{padding: 0}} key={index}>
                          <div style={{width: '100%'}}>
                            <EventCardMobile event={event}/>
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
                        </ListItem>
                      ))}
                    </ul>
                )
              })
            )
        )
      }
      </Fragment>
    )
  }
}

EventListMobileView.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  loading: state.data.loading,
  events: state.data.eventListWithDate
})

export default connect(mapStateToProps)(withStyles(styles)(EventListMobileView));
