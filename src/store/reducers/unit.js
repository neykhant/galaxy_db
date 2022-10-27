import { DELETE_UNIT, SHOW_UNIT, SHOW_UNITS } from '../type'

const initialState = {
  units: [],
  unit: {},
}

const unit = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_UNITS:
      return {
        ...state,
        units: action.payload,
      }
    case SHOW_UNIT:
      return {
        ...state,
        unit: action.payload,
      }
    case DELETE_UNIT:
      return {
        ...state,
        units: state.units.filter((unit) => unit.id !== action.payload),
      }
    default:
      return state
  }
}

export default unit
