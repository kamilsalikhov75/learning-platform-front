import { Job } from "entities/job";

export interface Course {
  _id: string;
  title: string;
  lessons: Lesson[];
  jobs: Job[];
  test: string;
}

export interface Lesson {
  _id: string;
  title: string;
  html: string;
  order: number;
  course: string;
}

export interface Test {
  _id: string;
  courseId: string;
  questions: Question[];
}

export interface Question {
  _id: string;
  title: string;
  options: string[];
  answer: string;
}

export interface CourseStore {
  currentCourse?: Course;
  currentLesson?: Lesson;
  courses?: Course[];
  lessons?: Lesson[];
  currentTest?: Test;
}
