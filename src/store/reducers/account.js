import { call } from '../../services/api'
import { serverErrorMessage } from '../../uitls/messages'
import {
  SHOW_ACCOUNTS,
  CREATE_ACCOUNTS,
  UPDATE_ACCOUNTS,
  FILTER_ACCOUNTS,
  ERROR_ACCOUNT,
  IS_SUCCESS_ACCOUNT,
  CLEAR_ALERT_ACCOUNT,
  CHANGE_PASSWORD,
  SET_LOADING,
  SET_SUCCESS,
  REMOVE_ERROR,
  ADD_ERROR,
  SHOW_ACCOUNT,
} from '../type'

const initialState = {
  accounts: [],
  account: {},
  error: [],
  isSuccess: false,
}

// export const createItem = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_SUCCESS, payload: false });
//     dispatch({ type: SET_LOADING });
//     try {
//       await call("post", "items/batchInsert", data);

//       dispatch({ type: SET_SUCCESS, payload: true });
//       dispatch({
//         type: REMOVE_ERROR,
//       });
//     } catch (error) {
//       const { status, data } = error.response;

//       if (status === 401) {
//         localStorage.removeItem("jwtToken");
//         dispatch({
//           type: ADD_ERROR,
//           payload: data.message,
//         });
//       }

//       if (status === 500) {
//         dispatch({
//           type: ADD_ERROR,
//           payload: serverErrorMessage,
//         });
//       }
//     }
//     dispatch({ type: SET_SUCCESS, payload: false });
//     dispatch({ type: SET_LOADING });
//   };
// };

const account = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ACCOUNTS:
      return {
        ...state,
        error: [],
        isSuccess: true,
        accounts: [action.account, ...state.accounts],
      }
    case SHOW_ACCOUNTS:
      return {
        ...state,
        accounts: action.accounts,
      }
    case SHOW_ACCOUNT:
      return {
        ...state,
        account: action.account,
      }
    case FILTER_ACCOUNTS:
      const filterAccount = state.accounts.filter(
        (member) => member.id !== action.id,
      )
      return {
        ...state,
        error: [],
        isSuccess: true,
        accounts: filterAccount,
      }
    case UPDATE_ACCOUNTS:
      const index = state.accounts.findIndex(
        (account) => account.id === action.data.id,
      )
      state.accounts[index] = action.data
      return {
        ...state,
      }
    case ERROR_ACCOUNT:
      return {
        ...state,
        error: action.error,
        isSuccess: false,
      }
    case IS_SUCCESS_ACCOUNT:
      return {
        ...state,
        isSuccess: action.isSuccess,
      }
    case CHANGE_PASSWORD:
      return {
        ...state,
        isSuccess: true,
        error: [],
      }
    case CLEAR_ALERT_ACCOUNT:
      return {
        ...state,
        error: [],
        isSuccess: false,
      }
    default:
      return state
  }
}
export default account
