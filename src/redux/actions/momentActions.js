import {
  UPLOADING,
  STOP_UPLOADING,
  FETCH_MOMENTS,
  SET_MOMENTS,
  ADD_MOMENT,
  LIKE_MOMENT,
  UNLIKE_MOMENT,
  SET_TIMELINE,
  FETCHING_TIMELINE,
  LOAD_MORE_FEED,
  ADD_LIKE_ARRAY,
  REMOVE_LIKE_ARRAY
} from '../types'
import axios from 'axios'

export const postMoment = (body) => dispatch => {
  dispatch({
    type: UPLOADING
  })
  let promises = []
  if(body.files.length > 0) {
    body.files.map((file, index) => {
      const formData = new FormData()
      if(file.type === 'image/jpeg' || file.type === 'image/png') {
        formData.append('image', file, file.name);
      } else {
        formData.append('video', file, file.name);
      }
      promises.push(axios.post('/upload', formData))
      });
      Promise.all(promises).then(result => {
        delete body.files
        let media = []
        result.forEach(elem => {
          media.push(elem.data)
        })
        const moment = {
          media,
          ...body
        }
        return axios.post('/moment', moment)
      }).then(res => {
        dispatch({
          type: ADD_MOMENT,
          payload: res.data.moment
        })
      }).catch(err => {
        console.log(err);
      })
  }
}

export const getUserMoments = (user) => dispatch => {
  dispatch({
    type: FETCH_MOMENTS
  })
  axios.get(`/moment/${user}`).then(res => {
      dispatch({
        type:SET_MOMENTS,
        payload: res.data.moments
      })
  }).catch(err => {
    console.log(err);
  })
}

export const likeMoment = (momentId) => (dispatch) => {
  axios.get(`/moment/${momentId}/like`).then((res) => {
    console.log(res);
    dispatch({
      type: LIKE_MOMENT,
      payload: res.data
    })
    dispatch({
      type: ADD_LIKE_ARRAY,
      payload: res.data.momentId
    })
  }).catch((err) => {
    console.log(err);
  })
}

export const unlikeMoment = (momentId) => (dispatch) => {
  axios.get(`/moment/${momentId}/unlike`).then((res) => {
    dispatch({
      type: UNLIKE_MOMENT,
      payload: res.data
    })
    dispatch({
      type: REMOVE_LIKE_ARRAY,
      payload: res.data.momentId
    })
  }).catch((err) => {
    console.log(err);
  })
}


export const getUserTimeline = (timestamp, loadMoreTimeline) => dispatch => {
  if(!loadMoreTimeline) {
    dispatch({
      type: FETCHING_TIMELINE
    })
  } else {
    dispatch({
      type: LOAD_MORE_FEED
    })
  }
  axios.get('/user/timeline/'+timestamp).then(res => {
    dispatch({
      type: SET_TIMELINE,
      payload: {
        timeline: res.data.timeline,
        loadMoreTimeline
      }
    })
  }).catch(err => {
    console.log(err);
  })
}
