import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import UserInfo from './UserInfo';
import IntroducerInfo from './IntroducerInfo';
import SignupInfo from './SignupInfo';

const generalInfo = combineReducers({
  UserInfo,
  IntroducerInfo,
  SignupInfo,
  routing: routerReducer,
});

export default generalInfo;
