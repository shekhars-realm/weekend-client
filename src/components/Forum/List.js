import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import ForumDialog from './ForumDialog'
import MyButton from '../../utils/MyButton'
import ReplyForm from './ReplyForm';
import axios from 'axios';
import Forum from './Forum';
//mui imports
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
    const {classes, forums, loadingForums} = this.props
    return(
      <div className={classes.forumList}>
        {
          forums.length > 0 && forums.map(forum => {
            return (
              <Forum forumIdParam={this.props.forumIdParam} forum={forum}/>
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
