import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import ForumDialog from './ForumDialog'
import MyButton from '../../utils/MyButton'
import ReplyForm from './ReplyForm';
import axios from 'axios';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Send from '@material-ui/icons/Send';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//icon imports
import ChatIcon from '@material-ui/icons/Chat';
//redux imports
import {connect} from 'react-redux';
import {getForums} from '../../redux/actions/forumActions'

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    minWidth: 200
  },
  content: {
   padding: 25,
   objectFit: 'cover'
  },
  forum: {
    display: 'flex',
    padding: 10,
    position: 'relative',
    transition: '1s',
    '-webkit-transition': '1s'
  },
  userImage: {
    width: 70,
    height: 70,
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
  },
  replyForm: {
    display: 'flex'
  }
});

class ForumList extends React.Component {

  state={
    errors: {},
    reply: '',
    forums: []
  }

  componentDidMount() {
    this.props.getForums()
  }

  render () {
    console.log('in list: ', this.props.forumIdParam);
    const {classes, forums, loadingForums} = this.props
    return(
      <div className={classes.forumList}>
        {
          forums.length > 0 && forums.map(forum => {
            return (
              <div className={classes.forum}>
                <img src={forum.userImage} className={classes.userImage}/>
                <div className={classes.forumbody}>
                  <Typography className={classes.handle} color="primary" component={Link} to={`/profile/${forum.user}`}>{forum.user}</Typography>
                  <br/>
                  <Typography className={classes.body} variant="body1">{forum.body}</Typography>
                  <br/>
                  <ForumDialog replyCount={forum.replyCount} forumId={forum.forumId} eventId={this.props.eventId} openDialog={
                      this.props.forumIdParam !== null && this.props.forumIdParam === forum.forumId ? true
                      : false
                    }/>
                  <ReplyForm forumId={forum.forumId}/>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

ForumList.propTypes = {
  loadingForums: PropTypes.bool.isRequired,
  forums: PropTypes.array.isRequired,
  getForums: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  loadingForums: state.forum.loadingForums,
  forums: state.forum.forums,
  eventId: state.data.eventObj.eventId
})

export default connect(mapStateToProps, {getForums})(withStyles(styles)(ForumList));
