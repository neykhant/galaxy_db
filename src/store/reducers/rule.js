import { DELETE_RULE, SHOW_RULE, SHOW_RULES } from '../type'

const initialState = {
  rules: [],
  rule: {},
}

const rule = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_RULES:
      return {
        ...state,
        rules: action.payload,
      }
    case SHOW_RULE:
      return {
        ...state,
        rule: action.payload,
      }
    case DELETE_RULE:
      return {
        ...state,
        rules: state.rules.filter((rule) => rule.id !== action.payload),
      }
    default:
      return state
  }
}

export default rule
