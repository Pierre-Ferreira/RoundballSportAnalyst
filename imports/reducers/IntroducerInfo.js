import * as types from '../constants/ActionTypes';

const initialState = {
  _id: '',
  firstName: '',
  lastName: '',
  clcNo: '',
};

const IntroducerInfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_INTRODUCER_INFO:
      return {
        ...state,
        _id: action.introducerInfo._id,
        firstName: action.introducerInfo.firstName,
        lastName: action.introducerInfo.lastName,
        clcNo: action.introducerInfo.clcNo,
      };
    default:
      return state;
  }
};

export default IntroducerInfo;
