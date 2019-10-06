import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Cancel from '@material-ui/icons/Cancel';
import CheckBox from '@material-ui/icons/CheckBox';
import {withStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
//redux import
import {connect} from 'react-redux';
import {changeParticipantStatus} from '../../redux/actions/dataActions';

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
    display: 'flex'
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
  progress: {
    position: 'absolute'
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    marginRight: 20
  }
})

class MemberCard extends React.Component {
  state = {
    status: '',
    loadingBtn: false
  }
  updateStatus = (status) => {
    const {eventId, participant: {user, userImage}} = this.props;
    const body = {
      status,
      eventId,
      user,
      userImage
    }
    this.setState({status, loadingBtn: true})
    axios.post('/event/changeParticipantStatus', body).then(res => {
      this.setState({
        loadingBtn: false
      })
      this.props.changeParticipantStatus(body);
    }).catch(err => {
      console.log(err.response);
    })
  }
  componentDidMount() {
    this.setState({
      status: this.props.participant.status ? this.props.participant.status : ''
    })
  }
  render () {
    const {classes, participant} = this.props
    return(
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <img src={participant.userImage} className={classes.userImage}/>
            <Typography variant="body1">
              {participant.user}
            </Typography>
          </CardContent>
          <CardActions>
            {this.state.status !== '' ? <Typography align='center' variant='body2'> Marked as {this.state.status}</Typography> : <div className={classes.controls}>
              <Button disabled={this.state.loadingBtn && this.state.status === 'absent'} color='default' onClick={() => {this.updateStatus('absent')}}>
                <Cancel/>
                {
                  this.state.loadingBtn && this.state.status === 'absent' && (
                    <CircularProgress size={30} className={classes.progress}/>
                  )
                }
              </Button>
              <Button disabled={this.state.loadingBtn && this.state.status === 'present'} color='primary' onClick={() => {this.updateStatus('present')}}>
                <CheckBox/>
                {
                  this.state.loadingBtn && this.state.status === 'present' && (
                    <CircularProgress size={30} className={classes.progress}/>
                  )
                }
              </Button>
            </div>}
          </CardActions>
        </div>
      </Card>
    )
  }
}

MemberCard.propTypes = {
  classes: PropTypes.object.isRequired,
  changeParticipantStatus: PropTypes.func.isRequired
}

export default connect(null, {changeParticipantStatus})(withStyles(styles)(MemberCard));
