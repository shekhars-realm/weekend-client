import React from 'react';
import dayjs from 'dayjs';
import $ from 'jquery';
import PropTypes from 'prop-types';
//mui imports
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info'

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'block',
    height: '100%',
    background: 'transparent'
  },
  image: {
    minWidth: 200,
    background: 'cover'
  },
  content: {
   padding: 25,
   objectFit: 'cover'
 },
 cardAction: {
   position: 'absolute',
   bottom: 0
 },
 addEventBtn: {
   float: 'right',
 },
 infoButton: {

 }
});


class EventCard extends React.Component {

  state={
    expanded: false
  }

  componentDidMount() {
    $(document).ready(function() {
      $('.content').mouseover(function() {
        console.log('hover');
        this.setState({
          expanded: true
        })
      }).mouseout(function() {
        this.setState({
          expanded: false
        })
      })
    })
  }

  render() {

    const {classes, event} = this.props;
    return (
      <Card className={classes.card}>
        <CardContent id='cardContent' className={classes.content}>
          <Typography variant="h5" color="primary">{event.name}</Typography>
          <Typography variant="body1" color="textSecondary">{new Date(event.startTime).toLocaleString()}</Typography>
          <Typography variant="body2">{event.description+event.description+event.description+event.description+event.description+event.description+event.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardAction} disableSpacing>
          <Button variant='contained' className='infoButton'>
            <InfoIcon/>
          </Button>
          <Button variant='contained' className='addEventBtn'>
            Get in
          </Button>
        </CardActions>
      </Card>
    );
  }
}

EventCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EventCard);
