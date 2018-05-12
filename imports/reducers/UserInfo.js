import * as types from '../constants/ActionTypes';

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  cellNo: '',
  clcNo: '',
  introducersUserId: '',
  walletAddress: '',
  joinedDate: '',
  active: '',
};

const UserInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_USER_INFO:
      return {
        ...state,
        _id: action.userInfo._id,
        firstName: action.userInfo.firstName,
        lastName: action.userInfo.lastName,
        username: action.userInfo.username,
        email: action.userInfo.emails[0].address,
        cellNo: action.userInfo.cellNo,
        clcNo: action.userInfo.clcNo,
        introducersUserId: action.userInfo.introducersUserId,
        walletAddress: action.userInfo.walletAddress,
        joinedDate: action.userInfo.joinedDate,
        active: action.userInfo.active,
      };
    case types.SAVE_USER_PERSONAL_INFO:
      return {
        ...state,
        firstName: action.userPersonalInfo.firstName,
        lastName: action.userPersonalInfo.lastName,
        cellNo: action.userPersonalInfo.cellNo,
      };
    case types.SAVE_WALLET_INFO:
      return {
        ...state,
        walletAddress: action.walletInfo.walletAddress,
      };
    case types.SAVE_EMAIL_INFO:
      return {
        ...state,
        email: action.emailInfo.emailNew,
      };
    default:
      return state;
  }
};

export default UserInfo;
