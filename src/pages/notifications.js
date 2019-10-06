import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import EventDeleted from '../components/Events/EventDeleted'
import RateEvent from '../components/Events/RateEvent'
import UserAbsent from '../components/Events/UserAbsent'
import { Link } from 'react-router-dom';
import moment from 'moment';
import $ from 'jquery'
import Navbar from '../components/Layout/Navbar'
//mui imports
import {withStyles} from '@material-ui/core/styles'
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import NotificationsOff from '@material-ui/icons/NotificationsOff';
import ListItemText from '@material-ui/core/ListItemText';
//redux imports
import {connect} from 'react-redux';
import { markNotificationsRead, getNotifications } from '../redux/actions/userActions';

const styles = theme => ({
  root: {
    textAlign: 'center'
  },
  followRequests:{
    width: '100%',
    textAlign: 'center',
    background: 'white',
    padding: 10
  },
  notificationIcon: {
    color: 'dodgerblue',
    fontSize: 80
  },
  noNotifications: {
    textAlign: 'center',
    padding: '20%'
  },
  loadMore: {
    paddingBottom: '40px',
    textAlign: 'center'
  }
})

class notifications extends React.Component {
  state={
    pageNumber: 0,
    noNextPage: false
  }
  componentDidMount() {
    this.props.getNotifications(new Date().toISOString())
    // if($('#loadMore')) {
    //   $('#loadMore').is(':visible') ? console.log('in view') : console.log('not in view');
    // }
    // $('#notifications').on('scroll', () => {
    //   console.log('scrolled');
    // })
  }
  getNotiContent = (not, time, icon) => {
    switch (not.type) {
      case 'eventDeleted':
        return <EventDeleted not={not}/>
      case 'markedAsAbsent':
        return <UserAbsent not={not}/>
      case 'markedAsPresent':
        return <RateEvent not={not}/>
      case 'forumPost':
        return (
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/event/${not.eventId}/forum/${not.forumId}`}
          >
            {not.sender} 'posted in your forum' {time}
          </Typography>
        )
      case 'forumReply':
        return (
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/event/${not.eventId}/forum/${not.forumId}`}
          >
            {not.sender} 'replied to your post' {time}
          </Typography>
        )
      case 'likeMoment':
        return (
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/moment/${not.momentId}`}
          >
            {not.sender + ' liked your moment ' + time}
          </Typography>
        )
      case 'followed':
        return(
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/profile/${not.sender}`}
          >
            {not.sender + ' started following you ' + time}
          </Typography>
        )
      case 'followRequest':
        return(
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/requests`}
          >
            {not.sender + ' wants to follow you '}
          </Typography>
        )
      case 'requestAccepted':
        return(
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/profile/`+not.sender}
          >
            {not.sender + ' accepted your follow request '+time}
          </Typography>
        )
      case 'eventJoined':
        return(
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/event/`+not.eventId}
          >
            {not.sender + ' joined your event '+time}
          </Typography>
        )
      case 'eventShare':
        return(
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/event/`+not.eventId}
          >
            {not.sender + ' shared an event with you '+time}
          </Typography>
        )
      default:
        return(
          <Typography
            color="default"
            variant="body2"
          >
            You have new notifications
          </Typography>
        )
    }
  }
  render () {
    const {classes, loadingNotifications, notifications, followRequests} = this.props
    let notificationsMarkup = loadingNotifications ? (
      <CircularProgress color='secondary' size={100} thickness={2} className={classes.progressSpinner}/>
    ) : (
      notifications && notifications.length > 0 ? (
        notifications.map((not, index) => {
          console.log(not);
          const time = moment(not.createdAt).fromNow();
          const icon = (<img style={{width: 40, height: 40, objectFit: 'cover', borderRadius: '50%', marginRight: 10}} src={not.senderImage}/>);

          const content = this.getNotiContent(not, time, icon)

          return (
            <ListItem button key={not.notificationId}>
              <ListItemIcon>
                {icon}
              </ListItemIcon>
              {content}
            </ListItem>

          );
        })
      ) : (
        <div className={classes.noNotifications}>
          <NotificationsOff className={classes.notificationIcon}/>
          <Typography variant='h5'>No notifications</Typography>
          <Typography variant='body1'>notifications regarding events, followers and follow requests will show up here!</Typography>
        </div>
      )
    )
    return(
      <Fragment>
        <div className={classes.followRequests}>
          <Typography
            component={Link}
            color="default"
            variant="body2"
            to={`/requests`}
          >
            {`${followRequests.length} follow requests `}
          </Typography>
        </div>
        <List
          component="nav"
          id='notifications'
          aria-labelledby="nested-list-subheader"
          className={classes.root}
        >
          {notificationsMarkup}
        </List>
        {
          this.state.noNextPage ? <Typography className={classes.loadMore} variant='body2' color='primary'>{"That's all"}</Typography> :
          notifications.length > 0 ? <Typography className={classes.loadMore} variant='body2' onClick={() => {this.props.getNotifications(notifications[notifications.length - 1].createdAt)}} id='loadMore' color='secondary'>{"Load more"}</Typography> : null
        }
      </Fragment>
    )
  }
}
notifications.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  followRequests: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
  loadingNotifications: PropTypes.bool.isRequired,
  getNotifications: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  notifications: state.user.notifications,
  followRequests: state.user.followRequests,
  loadingNotifications: state.user.loadingNotifications
})

export default connect(mapStateToProps, {markNotificationsRead, getNotifications})(withStyles(styles)(notifications));
