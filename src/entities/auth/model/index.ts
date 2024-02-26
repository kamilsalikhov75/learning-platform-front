import { createApi, createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { backend, getHeaders } from "shared/api/backend";
import { AuthStore, Sex, User } from "../types";

export const initialState: AuthStore = {
  isAuth: false,
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
  async (data: {
    firstName: string;
    lastName: string;
    surName: string;
    password: string;
    job: string;
    phone: string;
    sex: Sex;
  }) => {
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

export const updateMe = createEffect(
  async (data: {
    firstName?: string;
    lastName?: string;
    surName?: string;
    job?: string;
    phone?: string;
    sex?: Sex;
    finishedLessons?: string[];
  }) => {
    const { data: responseData } = await backend.request<User>({
      method: "PUT",
      url: "/users/me",
      headers: getHeaders(),
      data,
    });

    return responseData;
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
  .on(getMe.doneData, (state, user) => ({ ...state, user }))
  .on(updateMe.doneData, (state, user) => ({ ...state, user }));

export const { logout } = createApi($store, {
  logout: (state) => {
    Cookies.remove("access_token");
    return { ...state, isAuth: false, user: undefined };
  },
});
export const useAuth = () => useUnit($store);
