import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
//mui imports
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavouriteBorder from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Carousel } from "react-responsive-carousel";
import {withStyles} from '@material-ui/core/styles'

const styles = theme=> ({
  card: {
    margin: '10px 0px 10px 0px'
  },
  media: {
    height: 280,
    objectFit: 'cover'
  },
  avatar: {
    backgroundColor: red[500],
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  cardContent: {
    padding: 0
  },
  momentBio: {
    height: 30,
    margin: 10,
    background: 'grey'
  },
  cardAction: {
    padding: 0
  }
})

class MomentListSkeleton extends React.Component {
  render () {
    const {classes} = this.props
    return(
      <Fragment>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <img className={classes.userImage} src={'/images/no-img.png'}/>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={''}
            subheader={''}
          />
          <CardContent className={classes.cardContent}>
            <Carousel showArrows={false} showStatus={false} showIndicators={false} showThumbs={false}>
              <div>
                <img className={classes.media} src={'/images/mediaDefault.jpg'} />
              </div>
            </Carousel>
            <Typography className={classes.momentBio} variant="body2" color="textSecondary" component="p"/>
          </CardContent>
          <CardActions className={classes.cardAction} disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavouriteBorder color='primary' />
            </IconButton>
          </CardActions>
        </Card>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <img className={classes.userImage} src={'/images/no-img.png'}/>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={''}
            subheader={''}
          />
          <CardContent className={classes.cardContent}>
            <Carousel showArrows={false} showStatus={false} showIndicators={false} showThumbs={false}>
              <div>
                <img className={classes.media} src={'/images/mediaDefault.jpg'} />
              </div>
            </Carousel>
            <Typography className={classes.momentBio} variant="body2" color="textSecondary" component="p"/>
          </CardContent>
          <CardActions className={classes.cardAction} disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavouriteBorder color='primary' />
            </IconButton>
          </CardActions>
        </Card>
      </Fragment>
    )
  }
}

MomentListSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MomentListSkeleton);
