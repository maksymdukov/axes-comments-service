import axios from "axios";
import store from "app/store";
import { config } from "config";

const axiosInst = axios.create({
  baseURL: `${config.API_URL || ""}/api`,
});

export const apiRequest = ({ method = "GET", path, data, withAuth = true }) => {
  const headers = {};
  if (withAuth) {
    headers.Authorization = `Bearer ${store.getState().auth.token}`;
  }
  return axiosInst({
    method,
    url: path,
    data,
    headers,
  });
};
