// const initialState = [
//     {
//       id: 0,
//       key: 0,
//       name: "Hello"
//     }
//   ];
  
const initialState = {
  shop:{}
};
  const ShopReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_SHOPS":
        state = [...state, action.payload];
        return state;
      case "UPDATE_SHOPS":
        const updateState = state.map((shop) =>
        shop.id === action.payload.id ? action.payload : shop
        );
        state = updateState;
        return state;
      case "DELETE_SHOPS":
        const filterState = state.filter(
          (shop) => shop.id !== action.payload && shop
        );
        state = filterState;
        return state;
      default:
        return state;
    }
  };
  
  export default ShopReducer;
  