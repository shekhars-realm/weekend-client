import React from 'react';
import dayjs from 'dayjs';
import $ from 'jquery';
import PropTypes from 'prop-types';
import '../../utils/EventCard.css'
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
        <a href="#" class="meetup">{event.name}</a>
        <h3 class="group">{event.description}</h3>
        <p class="details">
          <span class="row">
            <i class="material-icons md-36 icon"><CloclkIcon/></i>
            <span class="row-item">
            <time>{new Date(event.startTime).toLocaleString()}</time>
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
