import { combineReducers } from 'redux';
import UserReducer from '../slices/userSlice';

const rootReducer = combineReducers({
  userState: UserReducer
});

export default rootReducer;