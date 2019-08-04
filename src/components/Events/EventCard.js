import React from 'react';
import dayjs from 'dayjs';
import $ from 'jquery';
import PropTypes from 'prop-types';
import '../../utils/EventCard.css'
import {Link} from 'react-router-dom';
//mui imports
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloclkIcon from '@material-ui/icons/AccessTime';
import LocationOn from '@material-ui/icons/LocationOn';


const styles = theme => ({

});


class EventCard extends React.Component {

  state={
    expanded: false
  }

  render() {

    const {classes, event} = this.props;
    return (
      <div class="wrapper">
        <Link to={'/event/'+event.eventId}>
          <p href="#" class="meetup">{event.name}</p>
        </Link>
        <h3 class="group">{event.description}</h3>
        <p class="details">
          <span class="row">
            <i class="material-icons md-36 icon"><CloclkIcon/></i>
            <span class="row-item">
            <strong>{new Date(event.startTime).toLocaleString()}</strong>
            </span>
          </span>
          <span class="row">
            <i class="material-icons md-36 icon"><LocationOn/></i>
            <span class="row-item">
            <strong>3 Kms</strong>
            </span>
          </span>
        </p>
      </div>

    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard);
