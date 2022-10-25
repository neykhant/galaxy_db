import { SET_DAILY_REPORTS, SET_REPORTS } from '../type'

const initialState = {
  report: [],
  dailyReport: [],
}

const report = (state = initialState, action) => {
  switch (action.type) {
    case SET_REPORTS:
      return {
        ...state,
        report: [action.report],
      }
    case SET_DAILY_REPORTS:
      return {
        ...state,
        dailyReport: [action.report],
      }
    default:
      return state
  }
}

export default report
