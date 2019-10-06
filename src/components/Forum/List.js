import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import MyButton from '../../utils/MyButton'
import ReplyForm from './ReplyForm';
import axios from 'axios';
import Forum from './Forum';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import SpeakerNotes from '@material-ui/icons/SpeakerNotes'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux imports
import {connect} from 'react-redux';
import {getForums} from '../../redux/actions/forumActions'

const styles = theme => ({
  forumList: {
    textAlign: 'center'
  },
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
   errorIcon: {
     color: 'dodgerblue',
     fontSize: 50
   },
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
    const {classes, forums, loadingForums} = this.props
    return(
      <div className={classes.forumList}>
        {
          loadingForums ? (
            <CircularProgress size={50} thickness={2} className={classes.progressSpinner}/>
          ) : (
            forums.length > 0 ? forums.map(forum => {
              return (
                <Forum showReplyForm={this.props.showReplyForm} forumIdParam={this.props.forumIdParam} forum={forum}/>
              )
            }) : <div className={classes.noForums}>
              <SpeakerNotes className={classes.errorIcon}/>
              <Typography variant='h6'>Be the first to ask!</Typography>
              <Typography variant='body2'>Ask the host about the event.</Typography>
            </div>
          )
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
