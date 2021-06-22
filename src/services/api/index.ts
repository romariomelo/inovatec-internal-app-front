import axios, { AxiosInstance } from "axios";
import { getToken } from "../token";

const BASE_URL = process.env.REACT_APP_WEBSERVICE_BASE_URL;

const Api = (): AxiosInstance => {
  const Api = axios.create({
    baseURL: BASE_URL,
    headers: {
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return Api;
};

export default Api;
