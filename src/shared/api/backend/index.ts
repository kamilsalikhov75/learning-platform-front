import { API } from "../instance";
import Cookies from "js-cookie";

export const backend = new API({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const getHeaders = () => {
  return { Authorization: `bearer ${Cookies.get("access_token")}` };
};
