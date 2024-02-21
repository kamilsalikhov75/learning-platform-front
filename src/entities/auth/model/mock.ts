import { Role, Sex, User } from "../types";

export const MockUser: User = {
  _id: "",
  firstName: "Имя",
  lastName: "Фамилия",
  surName: "Отчество",
  sex: Sex.Male,
  role: Role.Admin,
  phone: "+ 7 917 838 83-83",
};
