import { Job } from "entities/job";

export interface Course {
  _id: string;
  title: string;
  lessons: Lesson[];
  jobs: Job[];
  testId: string;
}

export interface Lesson {
  _id: string;
  title: string;
  html: string;
  order: number;
}

export interface Test {
  _id: string;
  courseId: string;
  questions: Question[];
}

export interface Question {
  _id: string;
  title: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface CourseStore {
  currentCourse?: Course;
  currentLesson?: Lesson;
  courses?: Course[];
}
