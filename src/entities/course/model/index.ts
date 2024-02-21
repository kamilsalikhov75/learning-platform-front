import { createApi, createStore } from "effector";
import { CourseStore, Lesson } from "../types";
import { useUnit } from "effector-react";
import { mockCourses, mockLessons } from "./mock";

export const initialState: CourseStore = {
  currentCourse: mockCourses[1],
  courses: mockCourses,
  currentLesson: mockLessons[0],
};

export const $store = createStore<typeof initialState>(initialState);

export const { setCourseLessons } = createApi($store, {
  setCourseLessons: (state, payload: Lesson[]) => {
    const lessons = payload.map((lesson, index) => {
      return { ...lesson, order: index + 1 };
    });
    if (state.currentCourse) {
      return {
        ...state,
        currentCourse: { ...state.currentCourse, lessons },
      };
    }
  },
});

export const useCourses = () => useUnit($store);
