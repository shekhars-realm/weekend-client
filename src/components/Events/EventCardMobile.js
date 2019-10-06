import React, {Fragment} from 'react';
import dayjs from 'dayjs';
import moment from 'moment';
import changeCase from 'change-case';
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
import AccessTime from '@material-ui/icons/AccessTime';
import Navigation from '@material-ui/icons/Navigation';
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
          <p class="group-mobile">{event.description.substring(0, 70)}<Link to={'/event/'+event.eventId}>...</Link></p>
        )
      } else {
        return (
          <p class="group-mobile">{event.description}</p>
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
              <div class="wrapper-mobile">
                <Link to={authenticated ? '/event/'+val.eventId : '/login'}>
                  <p href="#" class="meetup-mobile">{changeCase.sentenceCase(val.name)}</p>
                </Link>
                {this.displayDescription(val)}
                <p class="details-mobile">
                  <span class="row-mobile">
                    <AccessTime style={{fontSize: 18}}/>
                    <span class="row-item-mobile">
                    <strong>{moment(val.startTime).format('LT')}</strong>
                    </span>
                  </span>
                  <span class="row-mobile">
                    <LocationOn style={{fontSize: 18}}/>
                    <span class="row-item-mobile">
                    {
                      `${Math.round(val.distance)} Kms`
                    }
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <PeopleIcon style={{fontSize: 22}}/>
                    <span class="row-item-mobile">
                    {val.participantCount ? val.participantCount : 2}
                    </span>
                  </span>
                  <img src={val.userImage ? val.userImage : '/images/no-img.png'} class='hostImage-mobile'/>
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
