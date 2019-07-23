import {
  LOADING_DATA,
  LOADING_UI,
  CLEAR_ERRORS,
  SET_ERRORS,
  STOP_LOADING_UI,
  SET_LOCATIONS,
  ADD_EVENT
} from '../types';
import axios from 'axios';
import config from '../../utils/config';
import {setAuthorizationHeader} from './userActions'

const {MAP_API_KEY} = config;

export const addEvent = (event) => (dispatch) => {
  dispatch({type: LOADING_UI});
  axios.post('/event', event).then((res) => {
    dispatch({
      type: ADD_EVENT,
      payload: {
        name: res.data.name,
        description: res.data.description,
        geoHash: res.data.geoHash,
        geoPoint: res.data.geoPoint,
        primatyTag: res.data.tags[0],
        startTime: res.data.startTime,
        endTime: res.data.endTime
      }
    });
    dispatch({
      type: CLEAR_ERRORS
    });
  }).catch((err) => {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  })
}

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
}


export const setLocations = (filter) => (dispatch) => {
  dispatch({
    type: LOADING_UI
  });
  delete axios.defaults.headers.common["Authorization"];
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${filter.queryLocation}&key=${MAP_API_KEY}`).then((res) => {
    if(res.data.results.length > 0) {
      delete filter.queryLocation;
      filter.location = {
        lat: res.data.results[0].geometry.location.lat,
        lng: res.data.results[0].geometry.location.lng
      }
      const token = localStorage.getItem('FBIdToken')
      setAuthorizationHeader(token);
      axios.post('/events', filter).then((res) => {
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
        console.log('err: ', err);
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
