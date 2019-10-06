import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import Navbar from '../components/Layout/Navbar'
import {Link} from 'react-router-dom'
//mui Imports
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography'
import Error from '@material-ui/icons/Error'
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from '@material-ui/core/styles'
//redux imports
import {connect} from 'react-redux'
import {followRequestAction} from '../redux/actions/userActions'

const styles = theme => ({
  errorIcon: {
    color: 'dodgerblue',
    fontSize: 80
  },
  noRequests: {
    textAlign: 'center',
    padding: '20%'
  }
})

class requests extends React.Component {
  state={
    confirmedRequests: []
  }
  requestAction = (action, request) => {
    let tempArr = this.state.confirmedRequests
    tempArr.push(request.requestId)
    this.setState({
      confirmedRequests: tempArr
    })
    this.props.followRequestAction(action, request)
  }
  render () {
    const {classes, followRequests} = this.props
    return(
      <Fragment>
      <Navbar/>
      {
        followRequests.length > 0 && <List dense className={classes.root}>
        {
          followRequests.map((request, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            if(!this.state.confirmedRequests.includes(request.requestId)) {return (
              <ListItem key={index} button>
                <ListItemAvatar>
                  <Avatar
                    component={Link}
                    to={'/profile/'+request.followedBy}
                    src={request.followedByImg}
                  />
                </ListItemAvatar>
                <ListItemText component={Link} to={'/profile/'+request.followedBy} id={labelId} primary={request.followedBy} />
                <ListItemSecondaryAction>
                  <Button style={{marginRight: 5, fontSize: 10}} color='secondary' size='small' onClick={() => this.requestAction('decline',request)}>Decline</Button>
                  <Button variant='contained' color='secondary' size='small' onClick={() => this.requestAction('accept',request)}>Confirm</Button>
                </ListItemSecondaryAction>
                <Divider/>
              </ListItem>
            );}
          })
        }
      </List>
      }
      {
        followRequests.length === 0 && <div className={classes.noRequests}>
          <Error className={classes.errorIcon}/>
          <Typography variant='h5'>No requests</Typography>
          <Typography variant='body1'>Here you can find all the requests that has been sent to you while you were on private mode!</Typography>
        </div>
      }

      </Fragment>
    )
  }
}

requests.propTypes = {
  followRequests: PropTypes.array.isRequired,
  followRequestAction: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  followRequests: state.user.followRequests
})

export default connect(mapStateToProps, {followRequestAction})(withStyles(styles)(requests))
