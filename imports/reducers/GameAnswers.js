import * as types from '../constants/ActionTypes';


const gameAnswers = (state = [], action) => {
  switch (action.type) {
    case types.SAVE_ANSWER_INFO: {
      return [
        ...state,
        action.answerObject,
      ];
    }
    case types.CLEAR_GAME: {
      state = [];
      return state;
    }
    default:
      return state;
  }
};

export default gameAnswers;
