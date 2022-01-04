import { combineReducers } from 'redux';

// ## Generator Reducer Imports
import gallery from './reducers/galleryReducer';
import app from '../modules/AppState';
import calendar from './reducers/calendarReducer';
import auth from './reducers/authReducer';


export default combineReducers({
  // ## Generator Reducers
  gallery,
  app,
  calendar,
  auth
  
});
