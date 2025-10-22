import { combineReducers } from 'redux';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
  userState: UserReducer
});

export default rootReducer;