import {
  LOADING_DATA,
  SET_LOCATIONS,
  ADD_EVENT,
  SET_MEETING_POINT,
  EVENT_ADDED,
  SET_EVENT,
  SET_USER_EVENTS,
  JOIN_EVENT,
  LEAVE_EVENT,
  ALERT_USER,
  DELETE_ALERT,
  CHANGE_PARTICIPANT_STATUS
} from '../types';
const initialState = {
  eventAdded: false,
  events: [],
  locations: [],
  eventObj: {},
  eventJoined: false,
  eventParticipants: [],
  meetingPoint: {},
  loading: false,
  eventsJoinedInSession: [],
  alert: '',
  forums: [],
  replies: [],
  loadingforums: false,
  loadingReplies: false
};

export default function(state = initialState, action) {
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case DELETE_ALERT:
      return {
        ...state,
        alert: ''
      }
    case ADD_EVENT:
      return {
        ...state,
        locations: [
          action.payload,
          ...state.locations
        ]
      }
    case SET_USER_EVENTS:
      return {
        ...state,
        loading: false,
        events: action.payload
      }
    case SET_EVENT:
      state.eventJoined = action.payload.joined
      state.eventParticipants = action.payload.participants
      return {
        ...state,
        eventObj: action.payload
      }
    case EVENT_ADDED:
      return {
        ...state,
        eventAdded: true
      }
    case SET_MEETING_POINT:
      return {
        ...state,
        meetingPoint: action.payload
      }
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false
      }
    case JOIN_EVENT:
      state.eventJoined = true
      state.eventObj.joined = true
      return {
        ...state,
        eventParticipants: [action.payload, ...state.eventParticipants]
      }
    case LEAVE_EVENT:
      let i = state.eventParticipants.findIndex(participant => {
        return participant.user === action.payload.user
      })
      state.eventParticipants.splice(i, 1)
      state.eventJoined = false
      state.eventObj.joined = false
      return {
        ...state
      }
    case ALERT_USER:
      return {
        ...state,
        alert: action.payload
      }
    case CHANGE_PARTICIPANT_STATUS:
      return {
        ...state,
        eventParticipants: state.eventParticipants.map(participant => {
          if(participant.user === action.payload.user) {
            participant.status = action.payload.status
          }
          return participant
        })
      }
    default:
      return {
        ...state
      }
  }
}
