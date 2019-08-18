import React from 'react'
import PropTypes from 'prop-types'
//mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: 20
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 8,
    paddingBottom: 8,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
})

class MemberCard extends React.Component {
  render () {
    const {classes, participant} = this.props
    return(
      <Card className={classes.card}>
        <CardMedia
          className={classes.cover}
          image={participant.userImage}
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {participant.user}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <Button variant='contained' color='primary'>{'Absent'}</Button>
            <Button variant='contained' color='secondary'>{'Present'}</Button>
          </div>
        </div>
      </Card>
    )
  }
}

MemberCard.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MemberCard);
