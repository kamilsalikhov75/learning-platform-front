import { Job } from "entities/job";
import { Course, Lesson } from "../types";

export const mockJobs: Job[] = [
  {
    _id: "1",
    title: "Job 1",
  },
  {
    _id: "2",
    title: "Job 2",
  },
  {
    _id: "3",
    title: "Job 3",
  },
];

export const mockLessons: Lesson[] = [
  {
    _id: "1",
    title: "Lesson 1",
    order: 1,
    html: '<p><a href="/" rel="noopener noreferrer" target="_blank">link</a> dsmsdksd dsj kdsj kdsk</p><p><br></p><p><br></p><p><br></p><p><br></p><p>dsdkdsldsk lk ls ks lk l kdlsd ksd l</p><h1>ddssdsdsdk lkd lsd k dld </h1><p><br></p><p>dksdlsdk lkds l kl k lk  dsdlk;</p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p>fdfdlfk lk l dkfdlklldfkfdldfkldfkdfldfkdfldfkldfdfdfkdfdfkdfldffdlkdf</p><p>fkdfdlkdfldfkfldfdkfdfddflfkfldfkffflfk</p><p><br></p><p><br></p><p>fdkfdlfkdfldfkdfldfkdflkdfldfkdfldffd</p><p>dfkldfdffdfkd</p><p>fd</p><p>fddffd</p><p>fd</p><p>df</p><p>f</p><p>d</p><p>df</p><p><br></p><p><br></p><p>kdflkdfl</p>',
  },
  {
    _id: "2",
    title: "Lesson 2",
    order: 2,
    html: '<a href="/" target="_blank">link 2<a/>',
  },
  {
    _id: "3",
    title: "Lesson 3",
    order: 3,
    html: '<a href="/" target="_blank">link 3<a/>',
  },
];

export const mockCourses: Course[] = [
  {
    _id: "1",
    title: "Course 1",
    lessons: [],
    jobs: mockJobs,
    testId: "",
  },
  {
    _id: "2",
    title: "Course 2",
    lessons: mockLessons,
    jobs: mockJobs,
    testId: "",
  },
];
