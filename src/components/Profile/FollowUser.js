import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
//mui imports
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
//redux imports
import {connect} from 'react-redux'
import {followUser, cancelRequest} from '../../redux/actions/userActions'

const styles = theme => ({
  followButton: {
    height: 28,
    fontSize: 11,
    background: '#0099FF'
  }
})

class FollowUser extends React.Component {
  constructor(props) {
    super(props)
    this.state={

    }
  }
  // constructor(props) {
  //   super(props)
  //   this.state= {
  //     followers: this.props.followers,
  //     following: this.props.following,
  //     sentFollowRequests: this.props.sentFollowRequests,
  //     btnText: '',
  //     loading: false,
  //     btnDisabled: false
  //   }
  // }
  // componentWillMount() {
  //   this.setState({
  //     followers: this.props.followers,
  //     following: this.props.following,
  //     sentFollowRequests: this.props.sentFollowRequests
  //   })
  //   this.handleButton()
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('updated', this.props);
  // }
  // handleButton = () => {
  //   const {userHandle, privateUser, loadedUser} = this.props
  //   const {followers, following, sentFollowRequests} = this.state
  //   console.log(this.state);
  //   if(following.includes(userHandle) && followers.includes(userHandle)) {
  //     this.setState({
  //       btnText: 'Following',
  //       btnDisabled: true
  //     })
  //   } else if(following.includes(userHandle) && !followers.includes(userHandle)) {
  //     this.setState({
  //       btnText: 'Follow back',
  //       btnDisabled: false
  //     })
  //   } else if(!following.includes(userHandle) && followers.includes(userHandle)) {
  //     this.setState({
  //       btnText: 'Following',
  //       btnDisabled: true
  //     })
  //   } else {
  //     if(sentFollowRequests.includes(loadedUser)) {
  //       this.setState({
  //         btnText: 'Cancel request',
  //         btnDisabled: false
  //       })
  //     } else {
  //       this.setState({
  //         btnText: 'Follow',
  //         btnDisabled: false
  //       })
  //     }
  //   }
  // }
  // componentDidUpdate(prevProp, prevState) {
  //   console.log('updated');
  // }
  handleBtnClick = () => {
    console.log('clicked');
    if(this.props.btnAction === 'Follow' || this.props.btnAction === 'Follow back') {
      this.props.followUser(this.props.loadedUser, this.props.privateUser)
    }
    if(this.props.btnAction === 'Cancel request') {
      this.props.cancelReques(this.props.loadedUser)
    }
  }
  // getActionButton = (props) => {
  //   const {  userHandle, loadedUser, classes,  privateUser} = props
  //   const {followers, following, sentFollowRequests} = this.state
  //   console.log(followers , following , sentFollowRequests);
  //   if(followers && following && sentFollowRequests) {
  //     if(following.includes(userHandle) && followers.includes(userHandle)) {
  //       return(<Button disabled className={classes.followButton} variant='contained' fullWidth color='default'>Following</Button>)
  //     } else if(following.includes(userHandle) && !followers.includes(userHandle)) {
  //       return(<Button className={classes.followButton} variant='contained' fullWidth color='default' onClick={() => {this.props.followUser(loadedUser, privateUser)}}>Follow back</Button>)
  //     } else if(!following.includes(userHandle) && followers.includes(userHandle)) {
  //       return(<Button disabled className={classes.followButton} variant='contained' fullWidth color='default'>Following</Button>)
  //     } else if(!following.includes(userHandle) && !followers.includes(userHandle)) {
  //       if(sentFollowRequests.includes(loadedUser)) {
  //         return(<Button className={classes.followButton} variant='contained' fullWidth color='default' onClick={() => {this.props.cancelRequest(loadedUser)}}>Cancel request</Button>)
  //       } else {
  //         return(<Button className={classes.followButton} variant='contained' fullWidth color='default' onClick={() => {this.props.followUser(loadedUser, privateUser)}}>Follow</Button>)
  //       }
  //     } else {
  //       return(null)
  //     }
  //   }
  // }

  componentDidUpdate() {
    console.log('updated', this.props.followerArr);
  }
  render () {
    const {classes, userHandle, isFollowing, btnAction, loadedUser, privateUser} = this.props

    return(
      <Fragment>
        <Button disabled={isFollowing} className={classes.followButton} variant='contained' fullWidth color='default' onClick={() => {this.props.followUser(loadedUser, privateUser)}}>{btnAction}</Button>
      </Fragment>
    )
  }
}

FollowUser.propTypes = {
  classes: PropTypes.object.isRequired,
  followUser: PropTypes.func.isRequired,
  //sendFollowRequest: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  privateUser: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  btnAction: PropTypes.string.isRequired,
  cancelRequest: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isFollowing: state.user.loadedUser.isFollowing,
  btnAction: state.user.loadedUser.btnAction,
  userHandle: state.user.credentials.handle,
  privateUser: state.user.loadedUser.privateUser
})

export default connect(mapStateToProps, {followUser, cancelRequest})(withStyles(styles)(FollowUser));
