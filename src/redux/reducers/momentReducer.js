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
  RESET_MEDIA_UPLOADED
} from '../types'

const initialState = {
  uploading: false,
  fetchingMoments: false,
  moments: [],
  fetchingTimeline: false,
  momentUploaded: false,
  loadMoreTimeline: false,
  timeline: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOADING:
      return {
        ...state,
        uploading: true,
        momentUploaded: false
      }
    case ADD_MOMENT:
    const timelineObj = {
      data: action.payload,
      type: 'moment',
      momentId: action.payload.momentId,
      for: action.payload.user,
      createdAt: new Date().toISOString(),
    }
      return{
        ...state,
        moments: [action.payload, ...state.moments],
        timeline: [timelineObj, ...state.timeline],
        uploading: false,
        momentUploaded: true
      }
    case STOP_UPLOADING:
    return {
      ...state,
      uploading: false
    }
    case FETCH_MOMENTS:
      return{
        ...state,
        fetchingMoments: true
      }
    case SET_MOMENTS:
      return{
        ...state,
        moments: action.payload,
        fetchingMoments: false
      }
    case LIKE_MOMENT:
    case UNLIKE_MOMENT:
      let index = state.moments.findIndex((moment) => moment.momentId === action.payload.momentId);
      let indexTimeline = state.timeline.findIndex((moment) => moment.momentId === action.payload.momentId);
      state.moments[index] = action.payload;
      if(state.timeline[indexTimeline]) state.timeline[indexTimeline].data = action.payload;
      return {
        ...state
      }
    case FETCHING_TIMELINE:
      return{
        ...state,
        fetchingTimeline: true
      }
    case LOAD_MORE_FEED:
      return{
        ...state,
        loadMoreTimeline: true
      }
    case SET_TIMELINE:
      return{
        ...state,
        fetchingTimeline: false,
        timeline: [...state.timeline, ...action.payload.timeline],
        loadMoreTimeline: false
      }
    case RESET_MEDIA_UPLOADED:
      return{
        ...state,
        momentUploaded: false
      }
    default:
      return {
        ...state
      }
  }
}
