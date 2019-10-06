import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css'
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import AddEvent from '../Events/AddEvent';
import Notifications from './Notifications';
import firebase from '../../utils/firebaseConfig'
import AddSpeedDial from '../Dialogs/AddSpeedDial'
import ControlFooter from './ControlFooter'
//redux Imports
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';
//MUI imports
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppIcon from '../../images/icon.png';
//import icons
import AddIcon from '@material-ui/icons/Add';
import ImageIcon from '@material-ui/icons/CropOriginal';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

class Navbar extends Component {
  componentDidMount() {
    console.log('in navbar', this.props);
  }
  componentDidUpdate(prevProps, prevSate) {
    console.log('in update  navbar');
  }
  render() {
    const {authenticated, imageUrl, loadingUser, handle} = this.props;
    const profile = loadingUser ? <AccountCircle style={{fontSize: 60}}/> : <img src={imageUrl} className='userImageNav'/>
    const navbar = (window.location.href.includes('login') || window.location.href.includes('signup')) ? null :
      <AppBar className="appBar">
        <Toolbar className='nav-container'>
          {
            authenticated ? (
              <Fragment>
                <Link to='/'>
                  <p class="homeButton">Spinzer</p>
                </Link>
                <Hidden smDown>
                  <Button style={{position: 'absolute', right: 80}} color='primary' component={Link} to={'/feed'}>
                    <ImageIcon style={{color: 'whitesmoke'}}/>
                  </Button>
                </Hidden>
                <Hidden smDown>
                  <Notifications />
                </Hidden>
                <Hidden smDown>
                  <div className="userProfileBtn">
                    <Link to={'/profile/'+handle}>
                      {profile}
                    </Link>
                  </div>
                </Hidden>
              </Fragment>
            ) : (
              <Fragment>
                <Link to='/'>
                  <Hidden smUp>
                    <img className="homeIcon" src={AppIcon} alt='app icon'/>
                  </Hidden>
                  <Hidden only='xs'>
                    <p class="homeButton">Spinzer</p>
                  </Hidden>
                </Link>
                <div className="userProfileBtnSignup">
                  <Button color='secondary' component={Link} to='/signup'>Signup</Button>
                </div>
                <div className="userProfileBtn">
                  <Button color='secondary' component={Link} to='/login'>Login</Button>
                </div>
              </Fragment>
            )
          }
        </Toolbar>

        {authenticated ?
        <div>
          <Hidden smDown><AddSpeedDial/></Hidden>
          <Hidden mdUp><ControlFooter/></Hidden>
        </div> : null}
      </AppBar>
    return navbar
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  imageUrl: PropTypes.string.isRequired,
  logoutUser: PropTypes.func.isRequired,
  handle: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  imageUrl: state.user.credentials.imageUrl,
  loadingUser: state.user.loading,
  handle: state.user.credentials.handle
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
