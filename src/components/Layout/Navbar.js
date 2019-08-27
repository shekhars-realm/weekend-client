import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css'
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import AddEvent from '../Events/AddEvent';
import Notifications from './Notifications';
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
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

class Navbar extends Component {
  render() {
    const {authenticated, imageUrl, loadingUser, handle} = this.props;
    const profile = loadingUser ? <AccountCircle style={{fontSize: 60}}/> : <img src={imageUrl} className='userImageNav'/>
    return (
      <AppBar className="appBar">
        <Toolbar className='nav-container'>
          {
            authenticated ? (
              <Fragment>
                <Link to='/'>
                  <Hidden xlUp>
                    <img className="homeIcon" src={AppIcon} alt='app icon'/>
                  </Hidden>
                  <Hidden smDown>
                    <p class="homeButton">Weekend</p>
                  </Hidden>
                </Link>
                <div class='addEventBtn'>
                  <AddEvent history={this.props.history}/>
                </div>
                <Notifications />
                <div className="userProfileBtn">
                  <Link to={'/profile/'+handle}>
                    {profile}
                  </Link>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <Link to='/'>
                  <Hidden xlUp>
                    <img className="homeIcon" src={AppIcon} alt='app icon'/>
                  </Hidden>
                  <Hidden smDown>
                    <p class="homeButton">Weekend</p>
                  </Hidden>
                </Link>
                <div class='addEventBtn'>
                  <AddEvent/>
                </div>
                <div className="userProfileBtn">
                  <Button color='inherit' component={Link} to='/login'>Login</Button>
                </div>
              </Fragment>
            )
          }
        </Toolbar>
      </AppBar>
    );
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
