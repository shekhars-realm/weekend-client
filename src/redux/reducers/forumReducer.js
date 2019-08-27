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
  LOADING_FORUM,
  SET_FORUM,
} from '../types';

const initialState={
  alert: '',
  forums: [],
  replies: [],
  forum: {},
  loadingForums: false,
  loadingReplies: false,
  loadingForum: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_FORUMS:
      return {
        ...state,
        loadingForums: true
      }
    case LOADING_FORUM:
      return {
        ...state,
        loadingForum: true
      }
    case SET_FORUMS:
      return {
        ...state,
        loadingForums: false,
        forums: action.payload
      };
    case ADD_FORUM:
      return {
        ...state,
        forums: [action.payload, ...state.forums]
      };
    case DELETE_FORUM:
      let i = state.forums.findIndex(forum => {
        return forum.forumId === action.payload.forumId
      })
      state.forums.splice(i, 1)
      return {
        ...state
      };
    case ALERT_USER:
      return {
        ...state,
        alert: action.payload
      }
    case DELETE_ALERT:
      return {
        ...state,
        alert: ''
      }
    case SET_FORUM:
      return {
        ...state,
        loadingForum: false,
        forum: action.payload,
        replies: action.payload.replies
      }
    case ADD_REPLY:
      return {
        ...state,
        replies: [action.payload, ...state.replies]
      }
    default:
      return {
        ...state
      }
  }
}
