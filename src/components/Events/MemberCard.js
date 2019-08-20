import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
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
          {this.state.status !== '' ? <Typography align='center' variant='body2'> Marked as {this.state.status}</Typography> : <div className={classes.controls}>
            <Button disabled={this.state.loadingBtn && this.state.status === 'absent'} variant='contained' color='primary' onClick={() => {this.updateStatus('absent')}}>
              Absent
              {
                this.state.loadingBtn && this.state.status === 'absent' && (
                  <CircularProgress size={30} className={classes.progress}/>
                )
              }
            </Button>
            <Button disabled={this.state.loadingBtn && this.state.status === 'present'} variant='contained' color='secondary' onClick={() => {this.updateStatus('present')}}>
              Present
              {
                this.state.loadingBtn && this.state.status === 'present' && (
                  <CircularProgress size={30} className={classes.progress}/>
                )
              }
            </Button>
          </div>}

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
