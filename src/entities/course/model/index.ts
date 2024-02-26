import { createApi, createEffect, createStore } from "effector";
import { Course, CourseStore, Lesson } from "../types";
import { useUnit } from "effector-react";
import { backend, getHeaders } from "shared/api/backend";

export const initialState: CourseStore = {};

export const createCourse = createEffect(
  async (data: { title: string; jobs: string[] }) => {
    const { data: responseData } = await backend.request<Course>({
      method: "POST",
      url: `/courses`,
      headers: getHeaders(),
      data,
    });

    return responseData;
  }
);

export const getCourse = createEffect(async (id: string) => {
  const { data: responseData } = await backend.request<Course>({
    method: "GET",
    url: `/courses/${id}`,
    headers: getHeaders(),
  });

  return responseData;
});

export const getLesson = createEffect(async (id: string) => {
  const { data: responseData } = await backend.request<Lesson>({
    method: "GET",
    url: `/lessons/${id}`,
    headers: getHeaders(),
  });

  return responseData;
});

export const getCourseLessons = createEffect(async (courseId: string) => {
  const { data: responseData } = await backend.request<Lesson[]>({
    method: "GET",
    url: `/lessons/course/${courseId}`,
    headers: getHeaders(),
  });

  return responseData;
});

export const getCourses = createEffect(async () => {
  const { data: responseData } = await backend.request<Course[]>({
    method: "GET",
    url: `/courses`,
    headers: getHeaders(),
  });

  return responseData;
});

export const getRecommendedCourses = createEffect(async () => {
  const { data: responseData } = await backend.request<Course[]>({
    method: "GET",
    url: `/courses/my`,
    headers: getHeaders(),
  });

  return responseData;
});

export const createLesson = createEffect(
  async (data: { title: string; course: string }) => {
    const { data: responseData } = await backend.request<Lesson>({
      method: "POST",
      url: `/lessons`,
      headers: getHeaders(),
      data,
    });

    return responseData;
  }
);

export const updateLessonsOrder = createEffect(
  async (data: { lessons: Lesson[] }) => {
    const { data: responseData } = await backend.request<Lesson[]>({
      method: "PATCH",
      url: `/lessons/orders`,
      headers: getHeaders(),
      data,
    });

    return responseData;
  }
);

export const updateLesson = createEffect(
  async (data: { lessonId: string; data: Partial<Lesson> }) => {
    const { data: responseData } = await backend.request<Lesson>({
      method: "PATCH",
      url: `/lessons/${data.lessonId}`,
      headers: getHeaders(),
      data: data.data,
    });

    return responseData;
  }
);

export const $store = createStore<typeof initialState>(initialState)
  .on(getCourse.doneData, (state, course) => {
    return { ...state, currentCourse: course };
  })
  .on(getCourses.doneData, (state, courses) => {
    return { ...state, courses };
  })
  .on(getRecommendedCourses.doneData, (state, courses) => {
    return { ...state, courses };
  })
  .on(getCourseLessons, (state) => {
    return { ...state, lessons: [] };
  })
  .on(getCourseLessons.doneData, (state, lessons) => {
    return { ...state, lessons };
  })
  .on(createLesson.doneData, (state, lesson) => {
    if (state.lessons) {
      return { ...state, lessons: [...state.lessons, lesson] };
    }
    return { ...state, lessons: [lesson] };
  })
  .on(updateLessonsOrder.doneData, (state, lessons) => {
    return { ...state, lessons };
  })
  .on(getLesson.doneData, (state, lesson) => {
    return { ...state, currentLesson: lesson };
  })
  .on(updateLesson.doneData, (state, lesson) => {
    return { ...state, currentLesson: lesson };
  });

export const { setCourseLessons } = createApi($store, {
  setCourseLessons: (state, payload: Lesson[]) => {
    const lessons = payload.map((lesson, index) => {
      return { ...lesson, order: index + 1 };
    });
    if (state.currentCourse) {
      return {
        ...state,
        lessons,
      };
    }
  },
});

export const useCourses = () => useUnit($store);
