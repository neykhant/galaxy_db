import axios from "axios";
import { SET_DAILY_REPORTS, SET_REPORTS } from "../type";
import { apiUrl } from "../../constants/url";
export const setReport = (report) => ({
  type: SET_REPORTS,
  report,
});


export const setDailyReport = (report) => ({
  type: SET_DAILY_REPORTS,
  report,
});

export const getReport = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}report/sale?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = {
        ...response.data,
        key: response.data.sale_total,
      };

      dispatch(setReport(result));
    } catch (error) {
      console.log(error);
    }
  };
};

export const getDailyReport = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}report/daily-sale?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = {
        ...response.data,
        key: response.data.sale_total,
      };

      dispatch(setReport(result));
    } catch (error) {
      console.log(error);
    }
  };
};
