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
//import icons
import AddIcon from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';

class Navbar extends Component {
  render() {
    const {authenticated} = this.props;
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
                <MyButton tip='Logout' onClick={this.props.logoutUser}>
                  {'Logout'}
                </MyButton>
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
  logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {logoutUser})(Navbar);
