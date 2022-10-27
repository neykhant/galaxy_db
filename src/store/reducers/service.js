import {
  SHOW_SERVICES,
  SHOW_SERVICE,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_ITEM
} from "../type";

const initialState = {
  services: [],
  service: {},
  error: {}
};

const service = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SERVICES:
      return {
        services: [...state.services, action.service]
      };
    case SHOW_SERVICES:
      return {
        ...state,
        services: action.services
      };
      
    case SHOW_SERVICE:
      return {
        ...state,
        service: action.service
      };
    case FILTER_SERVICES:
      const filterServices = state.services.filter(
        (service) => service.id !== action.id
      );
      return {
        ...state,
        services: filterServices
      };
      
    case UPDATE_SERVICES:
      const index = state.services.findIndex(
        (service) => service.id === action.data.id
      );
      state.services[index] = action.data;
      return {
        ...state
      };
    case ERROR_ITEM:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default service;
