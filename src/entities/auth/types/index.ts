export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  surName: string;
  phone: string;
  role: Role;
  sex: Sex;
}

export enum Role {
  Default = "default",
  Admin = "admin",
  Supervisor = "supervisor",
}

export enum Sex {
  Male = "male",
  Female = "female",
}

export interface AuthStore {
  isAuth: boolean;
  user?: User;
}
