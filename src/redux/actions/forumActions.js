import {
  LOADING_FORUMS,
  ADD_FORUM,
  DELETE_FORUM,
  LOADING_REPLIES,
  SET_REPLIES,
  SET_FORUMS,
  ADD_REPLY,
  DELETE_REPLY,
  ALERT_USER,
  DELETE_ALERT,
  SET_FORUM,
  LOADING_FORUM
} from '../types';
import store from '../store';
import axios from 'axios';

export const addForum = (body) => (dispatch) => {
  const post = {
    body: body,
    user: store.getState().user.credentials.handle,
    userImage: store.getState().user.credentials.imageUrl,
    eventId: store.getState().data.eventObj.eventId,
    createdAt: new Date().toISOString(),
    replyCount: 0
  }
  dispatch({
    type: ADD_FORUM,
    payload: post
  })
  axios.post('/forums/add', post).then(res => {
    dispatch({
      type: ALERT_USER,
      payload: 'Added to forums!'
    })
  }).catch(err => {
    dispatch({
      type: DELETE_FORUM,
      payload: post
    })
    dispatch({
      type: ALERT_USER,
      payload: 'Error! Please try again.'
    })
  })
}

export const deleteForum = (post) => (dispatch) => {
  dispatch({
    type: DELETE_FORUM,
    payload: post
  })
  axios.delete(`/forum/${post.forumId}`).then(res => {
    dispatch({
      type: ALERT_USER,
      payload: 'Forum deleted!'
    })
  }).catch(err => {
    dispatch({
      type: ADD_FORUM,
      payload: post
    })
    dispatch({
      type: ALERT_USER,
      payload: 'Error! Please try again.'
    })
  })
}

export const getForums = () => (dispatch) => {
  const eventId=store.getState().data.eventObj.eventId
  dispatch({
    type: LOADING_FORUMS
  })
  axios.get(`/forums/${eventId}`).then(res => {
    dispatch({
      type: SET_FORUMS,
      payload: res.data.forums
    })
  }).catch(err => {
    console.log(err);
  })
}

export const deleteAlert = () => (dispatch) => {
  dispatch({
    type: DELETE_ALERT
  })
}

export const getForumDetails = (forumId) => (dispatch) => {
  dispatch({
    type: LOADING_FORUM
  })
  axios.get(`/forum/${forumId}`).then(res => {
    dispatch({
      type: SET_FORUM,
      payload: res.data.forum
    })
  }).catch(err => {
    console.log(err);
  })
}
