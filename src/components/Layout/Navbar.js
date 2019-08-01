import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css'
import PropTypes from 'prop-types';
import MyButton from '../../utils/MyButton';
import AddEvent from '../Events/AddEvent';
//redux Imports
import {connect} from 'react-redux';
import {logoutUser} from '../../redux/actions/userActions';
//MUI imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';

class Navbar extends Component {
  render() {
    const {authenticated, imageUrl, loadingUser} = this.props;
    const profile = loadingUser ? <AccountCircle style={{fontSize: 60}}/> : <img src={imageUrl} className='userImageNav'/>
    return (
      <AppBar className="appBar">
        <Toolbar className='nav-container'>
          {
            authenticated ? (
              <Fragment>
                <Link to='/'>
                  <MyButton tip='Home'>
                    <HomeIcon color='primary'/>
                  </MyButton>
                </Link>
                <AddEvent/>
                <Link to='/chat'>
                  <MyButton tip='Chat'>
                    <ChatIcon/>
                  </MyButton>
                </Link>
                <MyButton tip='Logout' onClick={this.props.logoutUser}>
                  Logout
                </MyButton>
                <Link to='/profile'>
                  <div className="userProfileBtn">
                    {profile}
                  </div>
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Button color='inherit' component={Link} to='/'>Home</Button>
                <Button color='inherit' component={Link} to='/login'>Login</Button>
                <Button color='inherit' component={Link} to='/signup'>Signup</Button>
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
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  imageUrl: state.user.credentials.imageUrl,
  loadingUser: state.user.loading
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
