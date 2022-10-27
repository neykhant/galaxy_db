const initialState = [
  {
    id: 0,
    member_code: 123,
    member_name: "HG HHk",
    member_phone: 9888888877,
    member_address: "Mdylliena"
  },
  {
    id: 1,
    member_code: 678,
    member_name: "Nbii Mbii",
    member_phone: 9853245452,
    member_address: "Bagoiekide"
  }
];

const MemberReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MEMBERS":
      state = [...state, action.payload];
      return state;
    case "UPDATE_MEMBERS":
      const updateState = state.map((member) =>
        member.id === action.payload.id ? action.payload : member
      );
      state = updateState;
      return state;
    case "DELETE_MEMBERS":
      const filterState = state.filter(
        (member) => member.id !== action.payload && member
      );
      state = filterState;
      return state;
    default:
      return state;
  }
};

export default MemberReducer;
