import React, {Fragment} from 'react';
import dayjs from 'dayjs';
import $ from 'jquery';
import PropTypes from 'prop-types';
import '../../utils/EventCard.css'
import {Link} from 'react-router-dom';
//mui imports
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CloclkIcon from '@material-ui/icons/AccessTime';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import LocationOn from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/PeopleRounded';
//redux Imports
import {connect} from 'react-redux';

const styles = theme => ({

});


class EventCard extends React.Component {

  state={
    expanded: false
  }

  displayDescription = (event) => {
    console.log(event);
    if(event.description) {
      if(event.description.length > 70) {
        return (
          <h3 class="group">{event.description.substring(0, 70)}<Link to={'/event/'+event.eventId}><MoreHoriz/></Link></h3>
        )
      } else {
        return (
          <h3 class="group">{event.description}</h3>
        )
      }
    } else {
      return null
    }
  }

  render() {

    let {classes, event, authenticated} = this.props;
    if(!Array.isArray(event)) {
      event = [event]
    }
    console.log('in event card!', event);
    return (
      <Fragment>
        {
          event.map(val => {
            return (
              <div class="wrapper">
                <Link to={authenticated ? '/event/'+val.eventId : '/login'}>
                  <p href="#" class="meetup">{val.name}</p>
                </Link>
                {this.displayDescription(val)}
                <p class="details">
                  <span class="row">
                    <i class="material-icons md-36 icon"><CloclkIcon/></i>
                    <span class="row-item">
                    <strong>{new Date(val.startTime).toLocaleString()}</strong>
                    </span>
                  </span>
                  <span class="row">
                    <i class="material-icons md-36 icon">{
                        this.props.participants ? <PeopleIcon/> : <LocationOn/>
                      }</i>
                    <span class="row-item">
                    {
                      this.props.participants ? <strong>{val.participants.length}</strong> : <strong>{Math.round(val.distance)} Kms</strong>
                    }
                    </span>
                  </span>
                </p>
              </div>
            )
          })
        }
      </Fragment>

    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(withStyles(styles)(EventCard));
