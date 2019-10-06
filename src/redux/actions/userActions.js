import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_USER_LOCATION,
  SET_USER_FILTER,
  SET_LOADED_USER,
  DELETE_NOTIFICATION,
  MARK_NOTIFICATIONS_READ,
  SWITCH_PRIVATE_USER,
  ADD_AS_FOLLOWER,
  NEW_PROFILE_IMAGE,
  UPDATE_USER_BIO,
  SENT_FOLLOW_REQUEST,
  REMOVE_FOLLOW_REQUEST,
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS,
} from '../types';
import axios from 'axios';
import {setLocations} from './dataActions';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/login', userData).then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });
        history.push('/');
      }).catch((err) => {
        console.log('err: ', err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
      });
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post('/signup', newUserData).then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({
            type: CLEAR_ERRORS
        });
        history.push({
          pathname: '/',
          state: {
            newUser: true
          }
        });
      }).catch((err) => {
        console.log('err: ', err);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
      });
}

export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({
    type: SET_UNAUTHENTICATED
  })
  if(history) history.push('/login')
}

export const getLoadedUser = (handle) => (dispatch) => {
  dispatch({type: LOADING_USER});
    axios.get(`/user/${handle}`).then((res) => {
        dispatch({
            type: SET_LOADED_USER,
            payload: res.data.credentials
        });
    }).catch((err) => {
        console.log(err);
    })
}

export const getUserData = () => (dispatch) => {
  dispatch({type: LOADING_USER});
    axios.get('/user').then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        });
    }).catch((err) => {
        console.log(err);
    })
}

export const uploadImage = (formData) => (dispatch) => {
  axios.post('/user/image', formData).then(res => {
    dispatch({
      type: NEW_PROFILE_IMAGE,
      payload: res.data.imageUrl
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const setUserFilter = (filter) => (dispatch) => {
  console.log('in usre actino', filter, setLocations);
  dispatch({
    type: SET_USER_FILTER,
    payload: filter
  });

}

export const editUserDetails = (userDetails) => (dispatch) => {
  axios.post('/user', userDetails).then(() => {
    dispatch({
      type: UPDATE_USER_BIO,
      payload: userDetails.bio
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post('/notifications', notificationIds)
    .then((res) => {
      dispatch({
        type: MARK_NOTIFICATIONS_READ
      });
    })
    .catch((err) => console.log(err));
};

export const setAuthorizationHeader = (token) => {
  console.log(token);
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}


export const deleteNotification = (notificationId) => (dispatch) => {
  dispatch({
    type: DELETE_NOTIFICATION,
    payload: notificationId
  })
}

export const followUser = (user, privateUser) => (dispatch) => {
  if(privateUser) {
    console.log('follow request');
    axios.get('/user/sendFollowRequest/'+user).then(res => {
      dispatch({
        type: SENT_FOLLOW_REQUEST,
        payload: user
      })
    }).catch(err => {
      console.log(err);
    })
  } else {
    console.log('followed');
    axios.get('/user/follow/'+user).then(res => {
      dispatch({
        type: ADD_AS_FOLLOWER,
        payload: user
      })
    }).catch(err => {
      console.log(err);
    })
  }
}

export const changePrivateStatus = (status) => (dispatch) => {
  axios.post('/user/changePrivateStatus', {
    privateUser: status
  }).then(res => {
    dispatch({
      type: SWITCH_PRIVATE_USER,
      payload: status
    })
  }).catch(err => {
    console.log(err);
  })
}

export const cancelRequest = (user) => (dispatch) => {
  axios.get('/user/cancelFollowRequest/'+user).then(res => {
    dispatch(getLoadedUser(user))
  }).catch(err => {
    console.log(err);
  })
}

export const followRequestAction = (action, request) => dispatch => {
  dispatch({
    type: REMOVE_FOLLOW_REQUEST,
    payload: request
  })
  const body = {
    action,
    user: request.followedBy,
    requestId: request.requestId
  }
  axios.post('/user/followRequestAction', body).then(res => {

  }).catch(err => {
    console.log(err.response);
  })
}


export const getNotifications = (pageNumber) => dispatch => {
  axios.get('/getNotifications/'+pageNumber).then(res => {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: res.data
    })
  }).catch(err => {
    console.log(err);
  })
}
