import {
  LOADING_DATA,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_MEETING_POINT,
  STOP_LOADING_UI,
  SET_LOCATIONS,
  ADD_EVENT,
  VERIFYING_LOCATION,
  STOP_VERIFYING_LOCATION,
  SET_USER_LOCATION,
  EVENT_ADDED,
  SET_USER_FILTER,
  SET_EVENT,
  SET_USER_EVENTS,
  DELETE_ALERT,
  JOIN_EVENT,
  LEAVE_EVENT,
  ALERT_USER,
  CHANGE_PARTICIPANT_STATUS,
  REMOVE_PARTICIPANT,
  RESET_EVENT_ADDED,
  RESET_MEDIA_UPLOADED
} from '../types';
import store from '../store';
import axios from 'axios';
import {setAuthorizationHeader, setUserLocation} from './userActions'

export const addEvent = (event) => (dispatch) => {
  dispatch({type: LOADING_UI});
  delete axios.defaults.headers.common["Authorization"];
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.queryLocation}&key=${process.env.REACT_APP_API_KEY}`).then((res) => {
    if(res.data.results.length > 0) {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
      event.location = {
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng
      }
      axios.post('/event', event).then((res) => {
        dispatch({
          type: ADD_EVENT,
          payload: {
            ...res.data
          }
        });
        dispatch({
          type: SET_MEETING_POINT,
          payload: {}
        })
        dispatch({
          type: CLEAR_ERRORS
        });
      }).catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      })
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: {
          location: 'Unknown location!'
        }
      })
      throw 'Unknown location!';
    }
  }).catch(err => {
    console.log(err);
  })

}

export const joinEvent = (eventId) => (dispatch) => {
  dispatch({
    type: JOIN_EVENT,
    payload: {
      user: store.getState().user.credentials.handle,
      userImage: store.getState().user.credentials.imageUrl
    }
  })
  axios.get(`/event/${eventId}/join`).then((res) => {
    dispatch({
      type: ALERT_USER,
      payload: 'Event has been added to your schedule'
    })
  }).catch((err) => {
    console.log(err.response);
    dispatch({
      type: LEAVE_EVENT,
      payload: {
        user: store.getState().user.credentials.handle,
        userImage: store.getState().user.credentials.imageUrl
      }
    })
    if(err.response && err.response.status === 405) {
      dispatch({
        type: ALERT_USER,
        payload: err.response.data.error
      })
    } else {
      dispatch({
        type: ALERT_USER,
        payload: 'Event cannot be removed. Try again later!'
      })
    }
  })
}

export const deleteAlert = () => (dispatch) => {
  dispatch({
    type: DELETE_ALERT
  })
}

export const leaveEvent = (eventId) => (dispatch) => {
  dispatch({
    type: LEAVE_EVENT,
    payload: {
      user: store.getState().user.credentials.handle,
      userImage: store.getState().user.credentials.imageUrl
    }
  })
  axios.get(`/event/${eventId}/leave`).then((res) => {
    dispatch({
      type: ALERT_USER,
      payload: 'Event has removed from schedule'
    })
  }).catch((err) => {
    dispatch({
      type: JOIN_EVENT,
      payload: {
        user: store.getState().user.credentials.handle,
        userImage: store.getState().user.credentials.imageUrl
      }
    })
    dispatch({
      type: ALERT_USER,
      payload: 'Event cannot be removed. Try again later!'
    })
  })
}

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
}

export const getUserEvents = (handle) => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  })
  axios.get(`/events/${handle}`).then((res) => {
    dispatch({
      type: SET_USER_EVENTS,
      payload: res.data.events
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const filterEvents = (filter) => (dispatch) => {
  dispatch({
    type: LOADING_DATA
  });
  delete axios.defaults.headers.common["Authorization"];
  console.log('filter: ', filter);
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${filter.queryLocation}&key=${process.env.REACT_APP_API_KEY}`).then((res) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    if(res.data.results.length > 0) {
      dispatch({
        type: SET_USER_FILTER,
        payload: {
          location: {
            lat: res.data.results[0].geometry.location.lat,
            lng: res.data.results[0].geometry.location.lng
          },
          ...filter
        }
      })
      filter.location = {
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng
      }
      axios.post('/events', filter).then((res) => {
        res.data.forEach(event => {
          event.joined=false
        })
        dispatch({
          type: SET_LOCATIONS,
          payload: res.data
        })
        dispatch({
          type: STOP_LOADING_UI
        });
        dispatch({
          type: CLEAR_ERRORS
        });
      }).catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        })
      })
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: {
          location: 'Unknown location!'
        }
      })
      throw 'Unknown location!';
    }
  }).catch(err => {
    console.log(err);
  })

}

export const setLocations = (filter) => (dispatch) => {
  console.log('in data actinos: ', filter);
  dispatch({
    type: LOADING_DATA
  });
  axios.post('/events', filter).then((res) => {
    res.data.forEach(event => {
      event.joined=false
    })
    dispatch({
      type: SET_LOCATIONS,
      payload: res.data
    })
    dispatch({
      type: STOP_LOADING_UI
    });
    dispatch({
      type: CLEAR_ERRORS
    });
  }).catch((err) => {
    console.log(err);
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    })
  })

}

export const getEvent = (eventId) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  axios.get(`/event/${eventId}`).then((res) => {
    dispatch({
      type: SET_EVENT,
      payload: res.data.event
    });
    dispatch({
      type: STOP_LOADING_UI
    });
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS
    })
  })
}

export const verifyLocation = (locationString) => (dispatch) => {
  dispatch({
    type: VERIFYING_LOCATION
  });
  delete axios.defaults.headers.common["Authorization"];
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${process.env.REACT_APP_API_KEY}`)
  .then((res) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('FBIdToken');
    if(res.data.results.length > 0) {
      dispatch({
        type: STOP_VERIFYING_LOCATION
      });
      dispatch({
        type: SET_MEETING_POINT,
        payload: {
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        }
      })
    } else {
      dispatch({
        type: SET_ERRORS,
        payload: {
          location: 'Location is unknown!'
        }
      })
    }
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: {
        location: 'Location is unknown!'
      }
    })
  })
}

export const changeParticipantStatus = (body) => (dispatch) => {
  dispatch({
    type: CHANGE_PARTICIPANT_STATUS,
    payload: body
  })
}

export const removeUserFromEvent = (user) => dispatch => {
  console.log('user removed!');
  dispatch({
    type: REMOVE_PARTICIPANT,
    payload: user
  })
}

export const resetUploadFlags = () => dispatch => {
  dispatch({
    type: RESET_EVENT_ADDED
  })
  dispatch({
    type: RESET_MEDIA_UPLOADED
  })
}
