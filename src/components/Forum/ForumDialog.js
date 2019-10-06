import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../utils/MyButton';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import Replies from './Replies';
import $ from 'jquery'
import ReplyForm from './ReplyForm';
//Muiimports
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icons import
import CloseIcon from '@material-ui/icons/Close';
import UnFoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//redux Imports
import {connect} from 'react-redux';
import {getForumDetails, addReply} from '../../redux/actions/forumActions';

const styles = (theme) => ({
  horizontalDivider: {
    border: 'none',
    margin: 4
  },
  userImage: {
    width: 45,
    height: 45,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    right: 0
  },
  expandButton: {
    position: 'absolute',
    right: 0
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  visibleSeparator: {
    width: '100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20
  },
  replyCount: {
    position: 'absolute',
    right: 0,
    top: 0,
    margin: '10px 15px 0px 0px',
    fontSize: 14,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  repliesText: {
    marginTop: 20,
    fontSize: 20,
    padding: 5
  }
});

class FormDialog extends React.Component {
  state={
    open: false,
    oldPath: '',
    newPath: ''
  }
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {

    let oldPath = window.location.pathname;

    const { forumId, eventId } = this.props;
    const newPath = `/event/${eventId}/forum/${forumId}`;

    if (oldPath === newPath) oldPath = `/event/${eventId}`;

    window.history.pushState(null, null, newPath);
    this.props.getForumDetails(this.props.forumId);
    this.setState({ open: true, oldPath, newPath });
  }
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({open: false})
  }
  render () {
    console.log('in dialog: ', this.props);
    const {classes, forum, replies, loadingForum} = this.props;

    const dialogMarkup = loadingForum ? <div className={classes.spinnerDiv}><CircularProgress size={100} thickness={2}/></div> : (
      <Fragment>
        <Grid container spacing={16}>
          <Grid style={{display: 'grid'}} item sm={2}>
            <img src={forum.userImage} alt='Profile' className={classes.userImage}/>
            <Typography variant="body2" color="secondary" component={Link} to={`/profile/${forum.user}`}>@{forum.user}</Typography>
          </Grid>
          <Grid style={{marginLeft: 10}} item sm={10}>
            {/*<Typography variant="body2" color="textSecondary">{dayjs(forum.createdAt).format('h:mm a,MMMM DD YYYY')}</Typography>*/}
            <Typography variant="body1">{forum.body}</Typography>
          </Grid>
        </Grid>
          {
            this.props.showReplyForm ? <ReplyForm addReply={this.props.addReply} forumId={forum.forumId}/> : null
          }
          <p className={classes.repliesText}>Replies</p>
          <hr className={classes.visibleSeparator}/>
          {replies && <Replies replies={replies}/>}
      </Fragment>
    )

    return (
      <Fragment>
        <p className={classes.replyCount} onClick={this.handleOpen}>{this.props.replyCount} replies</p>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullScreen={$(window).width() < 600 ? true : false}
          maxWidth='sm'
        >
          <MyButton tip='Close' onClick={this.handleClose} btnClassName={classes.closeButton}>
            <CloseIcon color='secondary'/>
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    )
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  getForumDetails: PropTypes.func.isRequired,
  addReply: PropTypes.func.isRequired,
  loadingForum: PropTypes.bool.isRequired,
  replies: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  forum: state.forum.forum,
  loadingForum: state.forum.loadingForum,
  replies: state.forum.replies
})

const mapActionsToProps = {
  getForumDetails,
  addReply
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(FormDialog));
