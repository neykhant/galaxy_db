import { mockItems } from "../../mock";
import { SHOW_SUPPLIERS, CREATE_SUPPLIERS } from "../type";

export const showSupplier = (suppliers) => ({
  type: SHOW_SUPPLIERS,
  suppliers
});

export const createSupplier = (supplier) => ({
  type: CREATE_SUPPLIERS,
  supplier
});

export const getSuppliers = () => {
  return async (dispatch) => {
    try {
      dispatch(showSupplier(mockItems));
    } catch (error) {}
  };
};

export const saveSuppliers = (data) => {
  return async (dispatch) => {
    try {
      
      mockItems.push(data);

      //   dispatch(createItems(data));
    } catch (error) {}
  };
};
