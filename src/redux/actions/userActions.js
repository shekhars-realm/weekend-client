import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_USER_LOCATION,
  SET_USER_FILTER,
  SET_LOADED_USER
} from '../types';import axios from 'axios';

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
        history.push('/');
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
  history.push('/login')
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
            payload: res.data.credentials
        });
    }).catch((err) => {
        console.log(err);
    })
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({
    type: LOADING_USER
  });
  axios.post('/user/image', formData).then(() => {
    dispatch(getUserData())
  }).catch((err) => {
    console.log(err);
  })
}

export const setUserFilter = (filter) => (dispatch) => {
  dispatch({
    type: SET_USER_FILTER,
    payload: filter
  });
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({type: LOADING_USER});
  axios.post('/user', userDetails).then(() => {
    dispatch(getUserData());
  }).catch((err) => {
    console.log(err);
  })
}

export const setAuthorizationHeader = (token) => {
  console.log(token);
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
}
