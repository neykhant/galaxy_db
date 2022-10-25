const initialState = {
  services: []
};

const ServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SERVICES":
      action.payload.forEach((elememt) => {
        state.services.push(elememt);
      });
      return {
        ...state,
        services: state.services
      };
    case "UPDATE_SERVICES":
      // console.log("update", state.services)
      const updateState = state.services.map((service) =>
        service.id === action.payload.id
          ? { ...action.payload, key: action.payload.id }
          : service
      );

      return {
        ...state,
        services: updateState
      };

    case "DELETE_SERVICES":
      const filterService = state.services.filter(
        (service) => service.id !== action.payload && service
      );
      // state = filterSupplier;
      // return state;
      return {
        ...state,
        services: filterService
      };
    default:
      return state;
  }
};

export default ServiceReducer;
