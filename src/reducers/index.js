import { combineReducers } from 'redux';
import routes from './routes';
import fetchdata from './fetchdata';

export default combineReducers({
  routes,
  fetchdata
});