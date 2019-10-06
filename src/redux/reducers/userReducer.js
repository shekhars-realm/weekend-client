import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADIN_UI,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SHOUT,
  UNLIKE_SHOUT,
  SET_USER_LOCATION,
  SET_USER_FILTER,
  SET_LOADED_USER,
  MARK_NOTIFICATIONS_READ,
  DELETE_NOTIFICATION,
  ADD_AS_FOLLOWER,
  SWITCH_PRIVATE_USER,
  NEW_PROFILE_IMAGE,
  UPDATE_USER_BIO,
  SENT_FOLLOW_REQUEST,
  REMOVE_FOLLOW_REQUEST,
  GET_NOTIFICATIONS,
  SET_NOTIFICATIONS,
  ADD_LIKE_ARRAY,
  REMOVE_LIKE_ARRAY
} from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    sameUserLoaded: false,
    loadingNotifications: true,
    loadedUser: {

    },
    userLocation: {

    },
    credentials: {

    },
    notifications: [],
    followRequests: [],
    likes: [],
    loadedUserFollowers: [],
    loadedUserFollowing: [],
    filter: {

    }
};

const startOfWeek = (date) => {
  //Get the start of Each week i.e. Monday
  let diff = date.getDate() - date.getDay() + (
    date.getDay() === 0
    ? -6
    : 1);
  date.setDate(diff);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0)
  date = new Date(date).getTime();
  return [date, date+86400000, date+(86400000*2), date+(86400000*3), date+(86400000*4), date+(86400000*5), date+(86400000*6)]
}

const createSchedule = (date, schedule) => {
  let newSchedule = []
  startOfWeek(date).forEach(elem => {
    let weekDay = elem;
    let events = [];
    if(schedule) {
      schedule.forEach(event => {
        if(new Date(event.startTime).getTime() >= elem && new Date(event.startTime).getTime() < elem+86400000) {
          events.push(event)
        }
      })
    }
    newSchedule.push({
      weekDay, events
    })
  })
  return newSchedule
}


export default function(state = initialState, action) {
    switch(action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
              ...state,
              sameUserLoaded: action.payload.credentials.handle === state.loadedUser.handle ? true : false,
              authenticated: true,
              loading: false,
              likes: action.payload.likes,
              credentials: action.payload.credentials
            };
        case SET_LOADED_USER:
          action.payload.schedule = createSchedule(new Date(), action.payload.schedule)
          return {
            ...state,
            sameUserLoaded: action.payload.handle === state.credentials.handle ? true : false,
            loadedUserFollowers: action.payload.followers,
            loadedUserFollowing: action.payload.following,
            loading: false,
            loadedUser: action.payload
          }
        case NEW_PROFILE_IMAGE:
          state.credentials.imageUrl = action.payload
          if(state.sameUserLoaded) state.loadedUser.imageUrl = action.payload
          return{
            ...state
          }
        case UPDATE_USER_BIO:
          state.credentials.bio = action.payload
          if(state.sameUserLoaded) state.loadedUser.bio = action.payload
          return{
            ...state
          }
        case SET_USER_FILTER:
          return {
            ...state,
            filter: {
              ...action.payload
            }
          };
        case LOADING_USER:
          return {
            ...state,
            loading: true
          }
        case DELETE_NOTIFICATION:
          state.user.notifications = state.user.notifications.filter(noti => {
            return noti.notificationId !== action.payload
          })
          return {
            ...state
          }
        case MARK_NOTIFICATIONS_READ:
          state.notifications.forEach((not) => (not.read = true));
          return {
            ...state
          };
        case SWITCH_PRIVATE_USER:
        state.credentials.privateUser = action.payload
          return{
            ...state
          }
        case ADD_AS_FOLLOWER:
          state.loadedUserFollowers.push(action.payload)
          state.loadedUser.btnAction = 'Following'
          state.loadedUser.isFollowing = true
          return{
            ...state
          }
        case SENT_FOLLOW_REQUEST:
        state.credentials.sentFollowRequests.push(action.payload)
        state.loadedUser.btnAction = 'Cancel request'
        return{
            ...state
          }
        case REMOVE_FOLLOW_REQUEST:
          let index = state.followRequests.findIndex(request => {
            return request.requestId === action.payload.requestId
          })
          state.followRequests.splice(index, 1)
          return{
            ...state
          }
        case GET_NOTIFICATIONS:
          return{
            ...state,
            loadingNotifications: true
          }
        case SET_NOTIFICATIONS:
          return{
            ...state,
            loadingNotifications: false,
            notifications: [...state.notifications, ...action.payload.notifications],
            followRequests: action.payload.followRequests
          }
        case ADD_LIKE_ARRAY:
        state.likes.push(action.payload)
          return{
            ...state,
          }
        case REMOVE_LIKE_ARRAY:
          return{
            ...state,
            likes: state.likes.filter(id => id !== action.payload)
          }
        default:
            return state;
    }
}
