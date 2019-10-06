import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import EventDeleted from '../Events/EventDeleted'
import RateEvent from '../Events/RateEvent'
import UserAbsent from '../Events/UserAbsent'
// MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';

class Notifications extends Component {
  state = {
    anchorEl: null,
    count: this.props.notifications.filter((not) => not.read === false).length
  };
  handleOpen = (event) => {
    this.setState({ anchorEl: event.target, count: 0 });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  onMenuOpened = () => {
    let unreadNotificationsIds = this.props.notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    this.props.markNotificationsRead(unreadNotificationsIds);
  };
  render() {
    const notifications = this.props.notifications;
    const anchorEl = this.state.anchorEl;

    dayjs.extend(relativeTime);

    let notificationsIcon;
    if (notifications && notifications.length > 0) {
      notifications.filter((not) => not.read === false).length > 0
        ? (notificationsIcon = (
            <Badge
              badgeContent={
                this.state.count
              }
              color="secondary"
            >
              <NotificationsIcon style={{color: 'whitesmoke'}}/>
            </Badge>
          ))
        : (notificationsIcon = <NotificationsIcon />);
    } else {
      notificationsIcon = <NotificationsIcon />;
    }
    let notificationsMarkup =
      notifications && notifications.length > 0 ? (
        notifications.map((not) => {
          console.log(not);
          const verb = not.type === 'forumPost' ? 'posted in your forum' : 'replied to your post';
          const time = dayjs(not.createdAt).fromNow();
          const iconColor = not.read ? 'primary' : 'secondary';
          const icon = (<img style={{width: 40, height: 40, objectFit: 'cover', borderRadius: '50%', marginRight: 10}} src={not.senderImage}/>);
          const content = not.type === 'eventDeleted' ? (
            <EventDeleted not={not}/>
          ) : (
            not.type === 'markedAsPresent' ? (
              <RateEvent not={not}/>
            ) : (
              not.type === 'markedAsAbsent' ? (
                <UserAbsent not={not}/>
              ) : (
                <Typography
                  component={Link}
                  color="default"
                  variant="body1"
                  to={`/event/${not.eventId}/forum/${not.forumId}`}
                >
                  {not.sender} {verb} {time}
                </Typography>
              )
            )
          )

          return (
            <MenuItem style={{background: not.read ? 'white' : 'beige'}} key={not.createdAt}>
              {icon}
              {content}
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.handleClose}>
          You have no notifications yet
        </MenuItem>
      );
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
             style={{position: 'absolute', right: 50, color: 'whitesmoke'}}
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            component={Link}
            to={'/notifications'}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    );
  }
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications
});

export default connect(
  mapStateToProps,
  { markNotificationsRead }
)(Notifications);
