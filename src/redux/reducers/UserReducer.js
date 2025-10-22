import {
  SET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  LOGOUT_USER
} from '../Actions/ActionTypes';

const initialState = {
  users: [],
  currentUser: null
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case DELETE_USER:
      return { ...state, users: state.users.filter((u) => u.id !== action.payload) };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        )
      };
    case SET_CURRENT_USER:
      return { ...state, currentUser: action.payload };
    case LOGOUT_USER:
      return { ...state, currentUser: null };
    default:
      return state;
  }
};

export default UserReducer;
