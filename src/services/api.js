import axios from "axios";
import { apiUrl } from "../constants/url";


export const setAccessToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${apiUrl}${path}`, data);
  return response.data;
};
