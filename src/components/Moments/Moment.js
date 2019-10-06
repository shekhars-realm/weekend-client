import React from 'react';
import PropTypes from 'prop-types'
import $ from 'jquery';
import moment from 'moment'
import {Link} from 'react-router-dom'
import LikeButton from './LikeButton'
//mui imports
import { withStyles } from '@material-ui/core/styles';
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
import "react-responsive-carousel/lib/styles/carousel.min.css";

const styles = theme => ({
  card: {
    margin: '10px 0px 10px 0px'
  },
  media: {
    maxHeight: 550,
    objectFit: 'contain'
  },
  avatar: {
    backgroundColor: red[500],
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  cardContent: {
    padding: 0
  },
  momentBio: {
    padding: '5px 10px 0px 10px'
  },
  cardAction: {
    padding: 0
  },
  mediadiv: {
    display: 'flex',
    maxHeight: 450,
    verticalAlign: 'middle'
  },
  likeCount: {
    padding: 0,
  },
  cardHeader: {
    padding: 5
  }
});

class Moment extends React.Component {
  state={
    autoplay: false,
    likeCount: 0
  }

  handleSlideChange = (index) => {
    let id = '#vid'+index
    console.log('id: ', id);
    if(this.props.momentObj.media[index].type === 'video/mp4') {
      $(id).get(0).play()
    } else {
      $(id).get(0).pause()
    }
  }

  componentDidMount() {
    this.setState({
      likeCount: this.props.momentObj.likeCount
    })
  }

  changeLikeCount = (type) => {
    this.setState({
      likeCount: type === 'like' ? this.state.likeCount+1 : this.state.likeCount-1
    })
  }

  render() {
    const {classes, momentObj} = this.props
    console.log('momentObj: ', momentObj);
    const username = <Typography variant='body1' component={Link} to={'/profile/'+momentObj.user}>{momentObj.user}</Typography>
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <img className={classes.userImage} src={momentObj.userImage}/>
          }
          style={{padding: 6}}
          title={<Typography variant='body2' color='default'>{username}</Typography>}
          subheader={<Typography variant='caption' color='default'>{'at ' + momentObj.eventObj.eventName}</Typography>}
        />
        <CardContent className={classes.cardContent}>
        {
          momentObj.media.length > 0 &&
            <Carousel showArrows={$(window).width() > 600 ? true : false} showStatus={false} showIndicators={momentObj.media.length > 1 ? true : false} showThumbs={false} swipeable>
            {
              momentObj.media.map((elem, index) => {
                return(
                  (elem.type === 'image/jpeg' || elem.type === 'image/png') ? <div className={classes.mediadiv}>
                      <img className={classes.media} src={elem.url} />
                  </div> : <div>
                    <video style={{maxWidth: '100%'}} id={'vid'+index} className={classes.media} loop controls src={elem.url}></video>
                  </div>
                )
              })
            }
            </Carousel>
        }
          <Typography className={classes.momentBio} variant="body2" color="textSecondary" component="p">
            {momentObj.momentText}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction} disableSpacing>
          <LikeButton likeCount={momentObj.likeCount} changeLikeCount={this.changeLikeCount} momentId={momentObj.momentId}/>
          <Typography className={classes.likeCount} variant="body2" color="grey" component="p">
            {this.state.likeCount}
          </Typography>
        </CardActions>
        <Typography style={{color: 'grey', margin: '0px 0px 7px 5px'}} variant='caption' color='grey'>{moment(momentObj.createdAt).fromNow()}</Typography>
      </Card>
    );
  }
}

Moment.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Moment)
