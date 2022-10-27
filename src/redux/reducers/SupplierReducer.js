const initialState = [
  {
    id: 0,
    code: 123,
    name: "Mg Hee",
    company_name: "Shew hlai",
    phone: 98888888888,
    other: "how is that",
  },
  {
    id: 1,
    code: 789,
    name: "Ko Oh",
    company_name: "Aung Hkek",
    phone: 96666666777777,
    other: "how is that where is she",
  },
  {
    id: 2,
    code: 789,
    name: "Ko Oh",
    company_name: "Aung Hkek",
    phone: 96666666777777,
    other: "how is that where is she",
  },
];

const SupplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SUPPLIERS":
      state = [...state, action.payload];
      return state;
    case "UPDATE_SUPPLIERS":
      const updateState = state.map((supplier) =>
        supplier.id === action.payload.id ? action.payload : supplier
      );
      state = updateState;
      return state;
    case "DELETE_SUPPLIERS":
      const filterSupplier = state.filter(
        (supplier) => supplier.id !== action.payload && supplier
      );
      state = filterSupplier;
      return state;
    default:
      return state;
  }
};

export default SupplierReducer;
