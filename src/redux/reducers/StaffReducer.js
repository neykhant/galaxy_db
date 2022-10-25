const initialState = [
    {
      id: 0,
      staff_name: "HG HHk",
      image: "",
      staff_dob: 55/6/77,
      staff_start_date: 22/3/2022,
      staff_phone: 9998878766,
      staff_salary: 2000000,
      staff_bank_account: 2768584737363,
    }
  ];
  
  const StaffReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_STAFFS":
        state = [...state, action.payload];
        return state;
      case "UPDATE_STAFFS":
        const updateState = state.map((staff) =>
        staff.id === action.payload.id ? action.payload : staff
        );
        state = updateState;
        return state;
      case "DELETE_STAFFS":
        const filterState = state.filter(
          (staff) => staff.id !== action.payload && staff
        );
        state = filterState;
        return state;
      default:
        return state;
    }
  };
  
  export default StaffReducer;
  