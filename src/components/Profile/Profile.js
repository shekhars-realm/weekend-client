import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import MyButton from '../../utils/MyButton'
import ProfileSkeleton from '../../utils/ProfileSkeleton';
//mui Imports
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import MuiLink from '@material-ui/core/Link';
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
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

const styles = theme => ({
  paper: {
   padding: 20
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
     width: 200,
     height: 200,
     objectFit: 'cover',
     maxWidth: '100%',
     borderRadius: '50%'
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
 userBio: {
   width: '100%',
   background: theme.palette.primary.main,
   borderRadius: 5,
   color: 'white',
   marginBottom: 10
 }
});

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      handle: this.props.handle,
      authenticatedUser: false
    }
  }

  handleImageChange = (event) => {
    const img = event.target.files[0];
    const formData = new FormData();
    formData.append('image', img, img.name);
    this.props.uploadImage(formData);
  }

  componentDidMount() {
    this.props.getLoadedUser(this.props.handle)
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

  handleEditPicture = () => {
    const fileInput = document.getElementById('userImage');
    fileInput.click();
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history)
  }

  render () {
    console.log(this.state.authenticatedUser)
    const {classes, user: {
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
          <div className="image-wrapper">
            <img src={loadedUser.imageUrl} alt="profile" className='profile-image'/>
            {
              sameUserLoaded ? <input hidden='hidden' type='file' id='userImage' onChange={this.handleImageChange}/> : null
            }
            {
              sameUserLoaded ? <MyButton tip='Edit Profile Image' onClick={this.handleEditPicture} btnClassName={classes.buttons}>
                <EditIcon color='primary'/>
              </MyButton> : null
            }
          </div>
          <hr/>
          <div className="profile-details">
              <Typography variant='h5'>@{loadedUser.handle}</Typography>
            <hr/>
            {
              loadedUser.bio && <Typography className={classes.userBio} variant='h6'>{loadedUser.bio}</Typography>
            }
            <Divider/>
            {
              loadedUser.ratings === 0 ? 'No ratings available yet' :
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Rating style={{paddingLeft: '35%'}} value={Math.round(loadedUser.rating)} readOnly />
                <Typography variant='caption'>{loadedUser.ratingCount} ratings</Typography>
              </Box>
            }
            <Typography variant='h6' color='default'>Events Organised: <span>{loadedUser.eventsOrganised}</span></Typography>
            <Typography variant='h6' color='default'>Events Attended: <span>{loadedUser.eventsAttended}</span></Typography>
            <Divider/>
            {
              loadedUser.location && (
                <Fragment>
                  <LocationOn color='primary'/><Typography variant='h6'>{loadedUser.location}</Typography>
                  <hr/>
                </Fragment>
              )
            }
            {
              loadedUser.website && (
                <Fragment>
                  <LinkIcon color='primary'/>
                  <a href={loadedUser.website} target='_blank' rel='noopener noreferrer'>
                    {' '}{loadedUser.website}
                  </a>
                  <hr/>
                </Fragment>
              )
            }
            <CalendarToday colr='primary'/>{' '}
            <span>Joined {dayjs(loadedUser.createdAt).format('MM YYYY')}</span>
          </div>
          {
            sameUserLoaded ? <MyButton tip='logout' onClick={this.handleLogout}>
              <Button variant='contained' color='primary'>Logout</Button>
            </MyButton> : null
          }
          {
            sameUserLoaded ? <EditDetails/> : null
          }
        </div>
      </Paper>
    ) : <ProfileSkeleton />
    return profilemarkUp

  }
}

const mapStateToProps = (state) =>({
  user: state.user
});

const mapActionsToProps = {logoutUser, uploadImage, getLoadedUser};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
