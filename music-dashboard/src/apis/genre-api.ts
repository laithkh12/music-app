import { IGenresResponse } from "../models/genre-model";
import axiosClent from "./axiosClient";

export const genreApi = {
  getAll() {
    const url = "/genres";
    return axiosClent.get<unknown, IGenresResponse>(url);
  },
};
