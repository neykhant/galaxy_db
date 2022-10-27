import axios from "axios";
import {
  SHOW_DAILY_STAFFS,
  CREATE_DAILY_STAFFS,
  UPDATE_DAILY_STAFFS,
  FILTER_DAILY_STAFFS,
  ERROR_DAILY_STAFFS,
  SHOW_DAILY_STAFF
} from "../type";

export const showDailyStaffs = (staffs) => ({
  type: SHOW_DAILY_STAFFS,
  staffs
});

export const showDailyStaff = (staff) => ({
  type: SHOW_DAILY_STAFF,
  staff
});

export const createDailyStaffs = (staff) => ({
  type: CREATE_DAILY_STAFFS,
  staff
});

export const filterDailyStaffs = (id) => ({
  type: FILTER_DAILY_STAFFS,
  id
});

export const updateDailyStaffs = (data) => ({
  type: UPDATE_DAILY_STAFFS,
  data
});

export const setDailyStaffErrors = (error) => ({
  type: ERROR_DAILY_STAFFS,
  error
});

// export const getBestDailyStaff = (query) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/bestDaily?${new URLSearchParams(
//           query
//         ).toString()}`
//       );
//       console.log("aa", query.best);
//       const result = response.data.data.map((service) => {
//         return {
//           ...service,
//           key: service.id
//         };
//       });
//       dispatch(showDailyStaffs(result));
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setDailyStaffErrors(error.response.data.data));
//       }
//     }
//   };
// };


export const getDailyStaffs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees"
      );
      const result = response.data.data.map((item) => {
        return {
          ...item,
          key: item.id
        };
      });
      if (response.status === 200) {
        dispatch(showDailyStaffs(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setDailyStaffErrors(error.response.data.data));
      } else {
        dispatch(setDailyStaffErrors(error.response.data));
      }
    }
  };
};

export const getDailyStaff = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        // `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/${id}`
      );
      const result = response.data.data;
      //   console.log(result);
      if (response.status === 200) {
        dispatch(showDailyStaff(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setDailyStaffErrors(error));
      } else {
        dispatch(setDailyStaffErrors(error));
      }
    }
  };
};

export const saveDailyStaffs = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        // "http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees",
        data
      );
      console.log(response);
      //   if (response.status === 201) {
      //     dispatch(createDailyStaffs(result));
      //   }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setDailyStaffErrors(error.response.data.data));
      } else {
        dispatch(setDailyStaffErrors(error.response.data));
      }
    }
  };
};

export const deleteDailyStaffs = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        // `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/${id}`
      );
      if (response.status === 204) {
        dispatch(filterDailyStaffs(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setDailyStaffErrors(error.response.data.data));
      } else {
        dispatch(setDailyStaffErrors(error.response.data));
      }
    }
  };
};

export const editDailyStaffs = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        // `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/daily-fees/${id}?_method=put`,
        data
      );
      console.log(response);
      const result = response.data.data;
      if (response.status === 204) {
        dispatch(updateDailyStaffs(result));
      }
    } catch (error) {
      console.log(error);
      // if (error) {
      //   dispatch(setStaffErrors(error.response.data.data));
      // } else {
      //   dispatch(setStaffErrors(error.response.data));
      // }
    }
  };
};

// export const getStaffReport = (query) => {
//   return async (dispatch) => {
//     try {
//       const response = await axios.get(
//         `http://organicapi.92134691-30-20190705152935.webstarterz.com/api/v1/staffReport?${new URLSearchParams(
//           query
//         ).toString()}`
//       );
//       const result = response.data.map((report) => {
//         return {
//           ...report,
//           key: report.id
//         };
//       });
//       if (response.status === 200) {
//         dispatch(showStaffs(result));
//       }
//     } catch (error) {
//       if (error.response.status === 404) {
//         dispatch(setStaffErrors(error.response.data.data));
//       } else {
//         dispatch(setStaffErrors(error.response.data));
//       }
//     }
//   };
// };
