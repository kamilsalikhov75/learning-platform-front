import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, { message: "Заполните поле" }),
    lastName: z.string().min(1, { message: "Заполните поле" }),
    surName: z.string().min(1, { message: "Заполните поле" }),
    phone: z
      .string()
      .refine(
        (phone) => isValidPhoneNumber(phone, "RU"),
        "Введите корректный номер телефона"
      ),
    password: z
      .string()
      .min(6, { message: "Пароль должен быть больше 6 символов" }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Пароль должен быть больше 6 символов" }),
    sex: z.enum(["male", "female"], { invalid_type_error: "Выберите пол" }),
    job: z.object(
      {
        _id: z.string(),
        title: z.string(),
      },
      { required_error: "Выберите должность" }
    ),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        path: ["passwordConfirm"],
        code: "custom",
        message: "Пароли должны совпадать",
      });
    }
  });

export const loginSchema = z.object({
  phone: z
    .string()
    .refine(
      (phone) => isValidPhoneNumber(phone, "RU"),
      "Введите корректный номер телефона"
    ),
  password: z
    .string()
    .min(6, { message: "Пароль должен быть больше 6 символов" }),
});

export const profileSchema = z.object({
  firstName: z.string().min(1, { message: "Заполните поле" }),
  lastName: z.string().min(1, { message: "Заполните поле" }),
  surName: z.string().min(1, { message: "Заполните поле" }),
  phone: z
    .string()
    .refine(
      (phone) => isValidPhoneNumber(phone, "RU"),
      "Введите корректный номер телефона"
    ),

  sex: z.enum(["male", "female"], { invalid_type_error: "Выберите пол" }),
  job: z.object(
    {
      _id: z.string(),
      title: z.string(),
    },
    { required_error: "Выберите должность" }
  ),
});
