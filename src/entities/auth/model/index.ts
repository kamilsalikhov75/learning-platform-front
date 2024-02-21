import { createApi, createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { backend, getHeaders } from "shared/api/backend";
import { AuthStore } from "../types";
import { MockUser } from "./mock";

export const initialState: AuthStore = {
  isAuth: true,
  user: MockUser,
};

export const login = createEffect(
  async (data: { username: string; password: string }) => {
    const { data: responseData } = await backend.request<{
      access_token: string;
    }>({
      method: "POST",
      url: "/auth/login",
      data,
    });

    const tokenExpires = new Date(
      (jwtDecode(responseData.access_token).exp as number) * 1000
    );

    Cookies.set("access_token", responseData.access_token, {
      expires: tokenExpires,
    });
  }
);

export const register = createEffect(
  async (data: { name: string; email: string; password: string }) => {
    const { data: responseData } = await backend.request<{
      access_token: string;
    }>({
      method: "POST",
      url: "/users/register",
      data,
    });

    const tokenExpires = new Date(
      (jwtDecode(responseData.access_token).exp as number) * 1000
    );

    Cookies.set("access_token", responseData.access_token, {
      expires: tokenExpires,
    });
  }
);

export const getMe = createEffect(async () => {
  const { data } = await backend.request({
    method: "GET",
    url: `/users/me`,
    headers: getHeaders(),
  });

  return data;
});

export const $store = createStore<typeof initialState>(initialState)
  .on(login.doneData, (state) => ({ ...state, isAuth: true }))
  .on(register.doneData, (state) => ({ ...state, isAuth: true }))
  .on(getMe.doneData, (state, user) => ({ ...state, user }));

export const { logout } = createApi($store, {
  logout: (state) => {
    Cookies.remove("access_token");
    return { ...state, isAuth: false, user: undefined };
  },
});
export const useAuth = () => useUnit($store);
