import { combineReducers } from "redux";
import MemberReducer from "./MemberReducer";
import SupplierReducer from "./SupplierReducer";
import ServiceReducer from "./ServiceReducer";
import StaffReducer from "./StaffReducer";
import ShopReducer from "./ShopReducer";
import OwnerReducer from "./OwnerReducer";
import AccountReducer from "./AccountReducer";
import LoginReducer from "./LoginReducer";

export default combineReducers({
  MemberReducer,
  SupplierReducer,
  ServiceReducer,
  StaffReducer,
  ShopReducer,
  OwnerReducer,
  AccountReducer,
  LoginReducer,
});
