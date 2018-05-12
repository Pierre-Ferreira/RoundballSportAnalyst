import uuidv1 from 'uuid';
import * as types from '../constants/ActionTypes';

const initialState = {
  gameId: '',
  gameNoOfQuestions: '',
  gameTable: '',
  gameUpperRangeLimit: '',
  gameType: '',
  gameQuestionTime: '',
  gameInProgress: false,
  gameStartButtonText: 'BEGIN',
  gameStartButtonDisabled: false,
  displayWelcomeScreen: true,
};

const gameSettings = (state = initialState, action) => {
  switch (action.type) {
    case types.SAVE_GAME_SETTINGS:
      return {
        ...state,
        gameId: uuidv1(),
        gameNoOfQuestions: action.gameNoOfQuestions,
        gameTable: action.gameTable,
        gameUpperRangeLimit: action.gameUpperRangeLimit,
        gameType: action.gameType,
        gameQuestionTime: action.gameQuestionTime,
        gameInProgress: action.gameInProgress,
      };
    case types.START_GAME:
      return {
        ...state,
        gameInProgress: true,
        gameStartButtonText: 'WAT KYK JY? FOKUS OP DIE VRAE..',
        gameStartButtonDisabled: true,
        displayWelcomeScreen: false,
      };
    case types.END_GAME:
      return {
        ...state,
        gameInProgress: false,
        gameStartButtonText: 'SPEEL WEER!!',
        gameStartButtonDisabled: false,
      };
    default:
      return state;
  }
};

export default gameSettings;
