import {
  SET_USERS,
  ADD_USER,
  DELETE_USER,
  UPDATE_USER,
  SET_CURRENT_USER,
  LOGOUT_USER
} from './ActionTypes';

export const setUsers = (users) => ({ type: SET_USERS, payload: users });
export const addUser = (user) => ({ type: ADD_USER, payload: user });
export const deleteUser = (id) => ({ type: DELETE_USER, payload: id });
export const updateUser = (user) => ({ type: UPDATE_USER, payload: user });
export const setCurrentUser = (user) => ({ type: SET_CURRENT_USER, payload: user });
export const logoutUser = () => ({ type: LOGOUT_USER });
