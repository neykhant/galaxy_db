import axios from "axios";
import {
  SHOW_SERVICES,
  SHOW_SERVICE,
  CREATE_SERVICES,
  UPDATE_SERVICES,
  FILTER_SERVICES,
  ERROR_ITEM
} from "../type";
import { apiUrl } from "../../constants/url";

export const showServices = (services) => ({
  type: SHOW_SERVICES,
  services
});

export const showService = (service) => ({
  type: SHOW_SERVICE,
  service
});

export const createServices = (service) => ({
  type: CREATE_SERVICES,
  service
});

export const filterServices = (id) => ({
  type: FILTER_SERVICES,
  id
});

export const updateServices = (data) => ({
  type: UPDATE_SERVICES,
  data
});

export const setServiceError = (error) => ({
  type: ERROR_ITEM,
  error
});

export const getBestService = (query) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}services/bestService?${new URLSearchParams(
          query
        ).toString()}`
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
      dispatch(showServices(result));
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      }
    }
  };
};

export const getServices = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${apiUrl}services`
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });

      if (response.status === 200) {
        dispatch(showServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};

export const getService = (id) => {
  return async (dispatch) => {
    try {
      // console.log(id);
      const response = await axios.get(
        `${apiUrl}services/${id}`
      );
      const result = response.data.data;
      if (response.status === 200) {
        dispatch(showService(result));
      }
    } catch (error) {
      if (error) {
        dispatch(setServiceError(error));
      } else {
        dispatch(setServiceError(error));
      }
    }
  };
};

export const saveServices = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}services/batchInsert`,
        data
      );
      const result = response.data.data.map((service) => {
        return {
          ...service,
          key: service.id
        };
      });
      if (response.status === 201) {
        dispatch(createServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      }
    }
  };
};

export const deleteServices = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${apiUrl}services/${id}`
      );
      if (response.status === 204) {
        dispatch(filterServices(id));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};

export const editServices = (id, data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${apiUrl}services/${id}?_method=put`,
        data
      );
      const result = {
        ...response.data.data,
        key: response.data.data.id
      };

      if (response.status === 201) {
        dispatch(updateServices(result));
      }
    } catch (error) {
      if (error.response.status === 404) {
        dispatch(setServiceError(error.response.data.data));
      } else {
        dispatch(setServiceError(error.response.data));
      }
    }
  };
};
