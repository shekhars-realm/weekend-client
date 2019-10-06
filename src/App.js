import React from 'react';
import './App.css';
import themeFile from './utils/theme'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//Redux
import {Provider} from 'react-redux';
import store from './redux/store';
import {SET_AUTHENTICATED, SET_ERRORS} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userActions';
//Mui improts
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Hidden from '@material-ui/core/Hidden';
//pages import
import AddSpeedDial from './components/Dialogs/AddSpeedDial'
import home from './pages/home';
import feed from './pages/feed';
import notifications from './pages/notifications';
import login from './pages/login';
import resetpwd from './pages/resetpwd';
import signup from './pages/signup';
import profile from './pages/profile';
import moment from './pages/moment';
import chat from './pages/chat';
import requests from './pages/requests';
import event from './pages/event';
import setting from './pages/settings'
//components
import Navbar from './components/Layout/Navbar'
import ControlFooter from './components/Layout/ControlFooter'
import Footer from './components/Layout/Footer'
import AuthRoute from './utils/AuthRoute'

require('dotenv').config()

console.log(process.env);

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west2-weekend-62173.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const mapAPI = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar/>
          <div className='container'>
            <Switch>
              <Route exact path='/' component={home}/>
              <AuthRoute exact path='/login' component={login}/>
              <AuthRoute exact path='/resetpassword' component={resetpwd}/>
              <AuthRoute exact path='/signup' component={signup}/>
              <AuthRoute exact path='/event/:eventId' component={event}/>
              <AuthRoute exact path="/profile/:handle" component={profile}/>
              <AuthRoute exact path="/settings" component={setting}/>
              <AuthRoute exact path="/feed" component={feed}/>
              <AuthRoute exact path="/requests" component={requests}/>
              <AuthRoute exact path="/notifications" component={notifications}/>
              <AuthRoute exact path="/moment/:momentId" component={moment}/>
              <AuthRoute
                exact
                path='/event/:eventId/forum/:forumId'
                component={event}
              />
            </Switch>
          </div>
          {/*<Footer/>*/}
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
