import { createApi, createEffect, createStore } from "effector";
import { Course, CourseStore, Lesson, Question, Test } from "../types";
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

export const getTest = createEffect(async (testId: string) => {
  const { data: responseData } = await backend.request<Test>({
    method: "GET",
    url: `/tests/${testId}`,
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

export const createQuestion = createEffect(
  async (data: {
    question: { title: string; options: string[]; answer: string };
    testId: string;
  }) => {
    const { data: responseData } = await backend.request<Question>({
      method: "POST",
      url: `/questions`,
      headers: getHeaders(),
      data: data.question,
    });

    addQuestionToTest({ testId: data.testId, question: responseData._id });

    return responseData;
  }
);

export const deleteQuestion = createEffect(
  async (data: { questionId: string; testId: string }) => {
    const { data: responseData } = await backend.request<Question>({
      method: "DELETE",
      url: `/questions/${data.questionId}`,
      headers: getHeaders(),
    });

    deleteQuestionFromTest({
      testId: data.testId,
      questionId: data.questionId,
    });

    return responseData;
  }
);

export const addQuestionToTest = createEffect(
  async (data: { testId: string; question: string }) => {
    const questions = $store.getState().currentTest?.questions || [];
    const { data: responseData } = await backend.request<Test>({
      method: "PATCH",
      url: `/tests/${data.testId}`,
      headers: getHeaders(),
      data: { questions: [...questions, data.question] },
    });

    return responseData;
  }
);

export const deleteQuestionFromTest = createEffect(
  async (data: { testId: string; questionId: string }) => {
    const questions = $store.getState().currentTest?.questions || [];
    const { data: responseData } = await backend.request<Test>({
      method: "PATCH",
      url: `/tests/${data.testId}`,
      headers: getHeaders(),
      data: {
        questions: questions.filter(
          (question) => question._id !== data.questionId
        ),
      },
    });

    return responseData;
  }
);

export const createTest = createEffect(async (data: { course: string }) => {
  const { data: responseData } = await backend.request<Lesson>({
    method: "POST",
    url: `/tests`,
    headers: getHeaders(),
    data,
  });

  updateCourse({ courseId: data.course, course: { test: responseData._id } });

  return responseData;
});

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

export const updateCourse = createEffect(
  async (data: { courseId: string; course: { test: string } }) => {
    const { data: responseData } = await backend.request<Lesson[]>({
      method: "PATCH",
      url: `/courses/${data.courseId}`,
      headers: getHeaders(),
      data: data.course,
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
  .on(getLesson, (state) => {
    return { ...state, currentLesson: undefined };
  })
  .on(getLesson.doneData, (state, lesson) => {
    return { ...state, currentLesson: lesson };
  })

  .on(updateLesson.doneData, (state, lesson) => {
    return { ...state, currentLesson: lesson };
  })
  .on(createTest.doneData, (state, test) => {
    return {
      ...state,
      courses: state.courses?.map((course) => {
        if (course._id === test.course) {
          return { ...course, test: test._id };
        }
        return course;
      }),
    };
  })
  .on(getTest.doneData, (state, test) => {
    return { ...state, currentTest: test };
  })
  .on(createQuestion.doneData, (state, question) => {
    const currentTest = state.currentTest as Test;
    const questions = currentTest.questions || [];

    return {
      ...state,
      currentTest: {
        ...currentTest,
        questions: [...questions, question],
      },
    };
  })
  .on(deleteQuestion.doneData, (state, question) => {
    const currentTest = state.currentTest as Test;
    const questions = currentTest.questions || [];

    return {
      ...state,
      currentTest: {
        ...currentTest,
        questions: questions.filter((item) => item._id !== question._id),
      },
    };
  });

export const { setCourseLessons, resetCurrentLesson } = createApi($store, {
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
  resetCurrentLesson: (state) => {
    return { ...state, currentLesson: undefined };
  },
});

export const useCourses = () => useUnit($store);
