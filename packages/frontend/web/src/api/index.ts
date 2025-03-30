import { Api } from "./ApiClass";
import axios from "axios";
import { BASE_PATH } from "./constants";
import { catchResponseError, placeTokenIntoRequests } from "@/api/interceptors";
import { getLocalStorageJWT } from "@/api/local-storage";
import { userReduxApi } from "@/store/user";
import store from "@/store";
const axiosInstance = axios.create({ baseURL: BASE_PATH });
placeTokenIntoRequests(
  axiosInstance,
  getLocalStorageJWT,
  "Authorization",
  "Bearer "
);
catchResponseError(
  axiosInstance,
  () => {
    store.dispatch(userReduxApi.endpoints.logout.initiate(undefined));
  },
  401
);
export const api = new Api(axiosInstance);
