import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../utils/MyButton'
import ProfileSkeleton from '../../utils/ProfileSkeleton';
import ProfileAction from './ProfileAction';
import SearchFollowers from '../Dialogs/SearchFollowers'
import FollowUser from './FollowUser'
//mui Imports
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip'
import Box from '@material-ui/core/Box';
//redux imports
import {connect} from 'react-redux';
import {logoutUser, uploadImage, getLoadedUser} from '../../redux/actions/userActions';
//import icons
import LocationOn from '@material-ui/icons/LocationOn';
import SettingsApplications from '@material-ui/icons/SettingsApplications';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = theme => ({
  paper: {
   background: 'transparent',
   boxShadow: 'none',
   '& svg': {
     fontSize: 27
   }
 },
 profile: {
   '& .image-wrapper': {
     textAlign: 'center',
     position: 'relative',
     '& button': {
       position: 'absolute',
       top: '80%',
       left: '70%'
     }
   },
   '& .profile-image': {
     width: 70,
     height: 70,
     objectFit: 'cover',
     borderRadius: '50%',
   },
   '& .profile-details': {
     textAlign: 'center',
     '& span, svg': {
       verticalAlign: 'middle'
     },
     '& a': {
       color: '#00bcd4'
     }
   },
   '& hr': {
     border: 'none',
     margin: '0 0 10px 0'
   },
   '& svg.button': {
     '&:hover': {
       cursor: 'pointer'
     }
   }
 },
 buttons: {
   textAlign: 'center',
   '& a': {
     margin: '20px 10px'
   }
 },
 counts: {
   textAlign: 'center',
   marginTop: '15%',
   '& span': {
     fontSize: 13
   }
 },
 userBio: {
   width: '100%',
   borderRadius: 5,
   color: 'black',
   fontSize: 13,
   marginBottom: 10
 },
 profileSettingIcon: {
   position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 35,
 },
 profileScheduler: {
   position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 35,
 },
 userHandle: {
   fontWeight: 700,
 },
 followButton: {
   height: 28,
   fontSize: 11,
   background: '#0099FF'
 }
});

class ProfileMobileView extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      handle: this.props.handle,
      authenticatedUser: false
    }
  }

  handleImageChange = (event) => {
    console.log(event.target.files);
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append('image', img, img.name);
    this.props.uploadImage(formData);
  }

  componentDidMount() {
    this.props.getLoadedUser(this.props.handle)
  }


  handleEditPicture = () => {
    const fileInput = document.getElementById('userImage');
    fileInput.click();
  }


    componentDidUpdate(prevProp, prevState) {
      if(this.props.handle!==prevProp.handle) {
        console.log(this.props.user.credentials.handle, this.props.user.loadedUser.handle);
        this.props.getLoadedUser(this.props.handle)
        if(this.props.user.credentials.handle === this.props.user.loadedUser.handle) {
          this.setState({
            authenticatedUser: true
          })
        } else {
          this.setState({
            authenticatedUser: false
          })
        }
      }
    }

  handleLogout = () => {
    this.props.logoutUser(this.props.history)
  }

  render () {
    const {classes, followers, sentFollowRequests, loadedImageUrl, loadedUserBio, following, user: {
      credentials,
      loading,
      authenticated,
      loadedUser,
      sameUserLoaded
    }} = this.props;
    const {authenticatedUser} = this.state;
    let profilemarkUp  = !loading ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <Typography variant='h6' color='secondary' align='center' className={classes.userHandle}>{loadedUser.handle}</Typography>
          <Grid container spacing={0}>
            <Grid item xs={3}>
            <img src={loadedImageUrl} alt="profile" className='profile-image'/>
            </Grid>
            <Grid item xs={3}>
            <Typography variant='body1' className={classes.counts}>{loadedUser.eventsOrganised + loadedUser.eventsAttended} <br/><span>Events</span></Typography>
            </Grid>
            <Grid item xs={3}>
            <SearchFollowers text={'Followers'} userList={followers}/>
            </Grid>
            <Grid item xs={3}>
            <SearchFollowers text={'Following'} userList={following}/>
            </Grid>
          </Grid>
          <Grid style={{margin: '20px 0px 10px 0px'}} container spacing={0}>
            <Grid item xs={1}>
            {
              //sameUserLoaded ? <KeyboardReturn onClick={this.handleLogout}/> : null
            }
            </Grid>
            <Grid item xs={10}>
              {
                sameUserLoaded ? <EditDetails imageUrl={loadedImageUrl}/> : (
                  <FollowUser followerArr={followers} loadedUser={loadedUser.handle}/>
                )
              }
            </Grid>
            <Grid item xs={1}>
            {
              sameUserLoaded ? <SettingsApplications onClick={() =>{this.props.history.push('/settings')}}/>: <ProfileAction user={loadedUser.handle}/>
            }
            </Grid>
          </Grid>
          <div className="profile-details">
            {
              loadedUserBio && loadedUserBio.length > 0 && <Typography className={classes.userBio} variant='body1'>{loadedUserBio}</Typography>
            }
            <Divider style={{margin: 0}}/>
            {
              loadedUser.ratings === 0 ? 'No ratings available yet' :
              <div style={{display: 'inline-block'}}>
                <Rating value={Math.round(loadedUser.rating)} readOnly />
                <Typography variant='caption'>{loadedUser.ratingCount} ratings</Typography>
              </div>
            }
            <Divider style={{margin: 0}}/>
          </div>
        </div>
      </Paper>
    ) : <ProfileSkeleton />
    return profilemarkUp

  }
}

const mapStateToProps = (state) =>({
  user: state.user,
  followers: state.user.loadedUserFollowers,
  following: state.user.loadedUserFollowing,
  loadedImageUrl: state.user.loadedUser.imageUrl,
  loadedUserBio: state.user.loadedUser.bio,
  sentFollowRequests: state.user.credentials.sentFollowRequests
});

const mapActionsToProps = {logoutUser, uploadImage, getLoadedUser};

ProfileMobileView.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  followers: PropTypes.array.isRequired,
  following: PropTypes.array.isRequired,
  loadedImageUrl: PropTypes.string.isRequired,
  loadedUserBio: PropTypes.string.isRequired,
  sentFollowRequests: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ProfileMobileView));
