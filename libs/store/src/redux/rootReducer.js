import { combineReducers } from 'redux';
import auth from '../api/auth/reducer';
import booking from '../api/booking/reducer';
import core from '../api/core/reducer';
import forums from '../api/forums/reducer';

const appReducer = combineReducers({
  auth,
  booking,
  core,
  forums,
});

export default appReducer;
