import * as types from '../constants/ActionTypes';

const initialState = {
  email: '',
  username: '',
  firstName: '',
  lastName: '',
  cellNo: '',
  walletAddress: '',
};

const SignupInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_SIGNUP_INFO:
      return {
        ...state,
        email: action.signupInfo.email,
        username: action.signupInfo.username,
        firstName: action.signupInfo.firstName,
        lastName: action.signupInfo.lastName,
        cellNo: action.signupInfo.cellNo,
        walletAddress: action.signupInfo.walletAddress,
      };
    default:
      return state;
  }
};

export default SignupInfo;
