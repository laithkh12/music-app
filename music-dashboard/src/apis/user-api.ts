import { IUserResponse } from "../models/user-model";
import axiosClent from "./axiosClient";

export const userApi = {
  async getCurrentUser() {
    const url = "/users/me";
    return axiosClent.get<unknown, IUserResponse>(url);
  },
};
