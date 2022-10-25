const initialState = [
  { 
    id: 0,
    key: 0,
    item_code: 47473,
    item_name: "Hello",
    item_total: 40
  }
];

const OwnerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_OWNERS":
      state = [...state, action.payload];
      return state;
    case "UPDATE_OWNERS":
      const updateState = state.map((owner) =>
      owner.id === action.payload.id ? action.payload : owner
      );
      state = updateState;
      return state;
    case "DELETE_OWNERS":
      const filterState = state.filter(
        (owner) => owner.id !== action.payload && owner
      );
      state = filterState;
      return state;
    default:
      return state;
  }
};

export default OwnerReducer;
