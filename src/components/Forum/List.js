import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import ForumDialog from './ForumDialog'
import MyButton from '../../utils/MyButton'
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
    reply: ''
  }

  componentDidMount() {
    this.props.getForums()
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = () => {
    if(this.state.reply === '') {
      const errors={
        reply: 'cannot be epmty!'
      }
      this.setState({errors})
    } else {

    }
  }

  render () {
    const {classes, forums} = this.props
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
                  <ForumDialog replyCount={forum.replyCount} forumId={forum.forumId} eventId={this.props.eventId}/>
                  <form className={classes.replyForm} onSubmit={this.handleSubmit}>
                    <TextField
                      name='reply'
                      type='text'
                      placeholder={'Reply'}
                      error={this.state.errors.reply ? true : false}
                      helperText={this.state.errors.reply}
                      className={classes.textField}
                      fullWidth
                      onChange={this.handleChange}
                    />
                    <Button type='submit' color='secondary'><Send/></Button>
                  </form>
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
  loadingforums: PropTypes.bool.isRequired,
  forums: PropTypes.array.isRequired,
  getForums: PropTypes.func.isRequired,
  eventId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  loadingforums: state.forum.loadingforums,
  forums: state.forum.forums,
  eventId: state.data.eventObj.eventId
})

export default connect(mapStateToProps, {getForums})(withStyles(styles)(ForumList));
