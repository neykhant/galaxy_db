import { combineReducers } from "redux";
import merchant from "./merchant";
import member from "./member";
import item from "./item";
import supplier from "./supplier";
import item_transfer from "./item_transfer";
import auth from "./auth";
import shop from "./shop";
import expense from "./expense";
import account from "./account";
import expense_name from "./expense_name";
import service from "./service";
import staff from "./staff";
import purchase from "./purchase";
import stock from "./stock";
import bad_item from "./bad_item";
import owner from "./owner";
import voucher from "./voucher";
import report from "./report";
import status from "./status";
import error from "./error";
import bonus from "./bonus";
import daily from "./daily";
import lucky from "./lucky";
import unit from './unit'
import changeShopHistory from "./changeShopHistory";
import changeStockHistory from "./changeStockHistory";
import rule from "./rule"

// export * from "./account.js";

const reducers = combineReducers({
  error,
  merchant,
  member,
  supplier,
  item_transfer,
  auth,
  shop,
  expense,
  account,
  expense_name,
  service,
  item,
  staff,
  purchase,
  stock,
  bad_item,
  owner,
  voucher,
  report,
  status,
  bonus,
  lucky,
  daily,
  unit,
  changeShopHistory,
  changeStockHistory,
  rule,
});

export default reducers;
