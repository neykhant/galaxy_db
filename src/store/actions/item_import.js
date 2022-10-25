import { mockItems } from "../../mock";
import { SHOW_ITEMS_IMPORTS, CREATE_ITEMS_IMPORTS } from "../type";

export const showItemImports = (itemImports) => ({
  type: SHOW_ITEMS_IMPORTS,
  itemImports: itemImports,
});

export const createItemImports = (itemImport) => ({
  type: CREATE_ITEMS_IMPORTS,
  itemImport,
});


export const getItemImports = () => {
  return async (dispatch) => {
    try {
      // result => api
      dispatch(showItemImports(mockItems));
    } catch (error) {}
  };
};

export const saveItemImports = (data) => {
  return async (dispatch) => {
    try {
      data.forEach((element) => {
        element.key = mockItems.length + 1;
        mockItems.push(element);
      });
      //   dispatch(createItems(data));
    } catch (error) {}
  };
};

