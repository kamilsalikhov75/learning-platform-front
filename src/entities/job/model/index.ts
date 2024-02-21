import { createEffect, createStore } from "effector";
import { useUnit } from "effector-react";
import { Job, JobStore } from "../types";
import { backend } from "shared/api/backend";

export const initialState: JobStore = {};

export const getJobs = createEffect(async () => {
  const { data: responseData } = await backend.request<Job[]>({
    method: "GET",
    url: "/jobs",
  });

  return responseData;
});

export const $store = createStore<typeof initialState>(initialState).on(
  getJobs.doneData,
  (state, jobs) => {
    return { ...state, jobs };
  }
);

export const useJobs = () => useUnit($store);
