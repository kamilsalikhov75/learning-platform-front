import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(5, { message: "Минимум 5 символов" }),
  jobs: z.array(
    z.object({
      title: z.string(),
      _id: z.string(),
    }),
    { required_error: "Выберите минимум одну должность" }
  ),
});

export const createLessonSchema = z.object({
  title: z.string().min(1, { message: "Минимум 1 символ" }),
});

export const createQuestionSchema = z.object({
  title: z.string().min(1, { message: "Минимум 1 символ" }),
  options: z
    .array(z.string().min(1))
    .min(2, "Введите хотя бы 2 варианта ответа"),
  answer: z.string().min(1, "Определите ответ"),
});

export const editLessonSchema = z.object({
  title: z.string().min(1, { message: "Минимум 1 символ" }),
  html: z.string().min(1, { message: "Минимум 1 символ" }),
});
