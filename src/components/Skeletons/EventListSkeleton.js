import React, {Fragment} from 'react';
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

    const {classes} = this.props;
    return (
      <Fragment>
      <div class="wrapper">
        <a href="#" class="meetupSKL"/>
        <h3 class="groupSKL"/>
        <h3 class="groupSKL"/>
        <p class="details">
          <span class="row">
            <i class="material-icons md-36 icon"><CloclkIcon/></i>
            <span class="row-item">
            <strong>Time</strong>
            </span>
          </span>
          <span class="row">
            <i class="material-icons md-36 icon"><LocationOn/></i>
            <span class="row-item">
            <strong>Distance</strong>
            </span>
          </span>
        </p>
      </div>
      <div class="wrapper">
        <a href="#" class="meetupSKL"/>
        <h3 class="groupSKL"/>
        <h3 class="groupSKL"/>
        <p class="details">
          <span class="row">
            <i class="material-icons md-36 icon"><CloclkIcon/></i>
            <span class="row-item">
            <strong>Time</strong>
            </span>
          </span>
          <span class="row">
            <i class="material-icons md-36 icon"><LocationOn/></i>
            <span class="row-item">
            <strong>Distance</strong>
            </span>
          </span>
        </p>
      </div>
      </Fragment>

    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard);
