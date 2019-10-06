import React from 'react'
import PropTypes from 'prop-types'
import ForumDialog from './ForumDialog'
import {Link} from 'react-router-dom'
import ReplyForm from './ReplyForm';
import moment from 'moment';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  forum: {
    display: 'flex',
    padding: 10,
    position: 'relative',
    transition: '1s',
    '-webkit-transition': '1s'
  },
  userImage: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  forumbody: {
    background: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginLeft: 10
  },
  handle: {
    float: 'left',
    fontSize: 14
  },
  body: {
    float: 'left',
    fontSize: 14
  }
})

class Forum extends React.Component {
  state={
    replyCount: this.props.forum.replyCount
  }

  replyCountChange = () => {
    this.setState({
      replyCount: this.state.replyCount + 1
    })
  }

  render () {
    console.log('in forum: ', this.props.forum);
    const {forum, classes} = this.props
    const time = moment(forum.createdAt).fromNow();
    return (
      <div className={classes.forum}>
        <img src={forum.userImage} className={classes.userImage}/>
        <div className={classes.forumbody}>
          <Typography className={classes.handle} color="secondary" variant="h6" component={Link} to={`/profile/${forum.user}`}>{forum.user}</Typography>
          <br/>
          <Typography style={{float: 'left'}} variant='caption' color='default'>{time}</Typography>
          <br/>
          <Typography className={classes.body} variant="body1">{forum.body}</Typography>
          <br/>
          <ForumDialog showReplyForm={this.props.showReplyForm} replyCount={this.state.replyCount} forumId={forum.forumId} eventId={forum.eventId} openDialog={
              this.props.forumIdParam !== null && this.props.forumIdParam === forum.forumId ? true
              : false
            }/>
          {
            this.props.showReplyForm ? <ReplyForm forumId={forum.forumId} replyCountChange={this.replyCountChange}/> : null
          }
        </div>
      </div>
    )
  }
}

Forum.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Forum);
