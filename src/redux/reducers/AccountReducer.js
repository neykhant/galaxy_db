import axios from "axios";

const initialState = [
    { 
      id: 0,
      key: 0,
      name: "helioedsc",
      row: "Hello",
      shop: "lldklsdkjf"
    }
    // axios.get(`http://organicapi.92134691-30-20190705152935.webstarterz.com/`)
  ];
  
  const AccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_ACCOUNTS":
        state = [...state, action.payload];
        return state;
      case "UPDATE_ACCOUNTS":
        const updateState = state.map((account) =>
        account.id === action.payload.id ? action.payload : account
        );
        state = updateState;
        return state;
      case "DELETE_ACCOUNTS":
        const filterState = state.filter(
          (account) => account.id !== action.payload && account
        );
        state = filterState;
        return state;
      default:
        return state;
    }
  };
  
  export default AccountReducer;
  