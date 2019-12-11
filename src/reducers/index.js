import { combineReducers } from 'redux';
import routes from './routes';
import fetchdata from './fetchdata';
import connection from './connection';
import fetchhistory from './fetchhistory';

export default combineReducers({
  routes,
  fetchdata,
  fetchhistory,
  connection
});