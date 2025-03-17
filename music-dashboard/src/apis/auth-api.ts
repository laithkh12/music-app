import { IAuthResponse, IAuthPayload } from "../models/auth-model";
import axiosClent from "./axiosClient";

export const authApi = {
  signUp(data: IAuthPayload) {
    const url = "/auth/sign-up";
    return axiosClent.post<unknown, IAuthResponse>(url, data);
  },
  signIn(data: IAuthPayload) {
    const url = "/auth/sign-in";
    return axiosClent.post<unknown, IAuthResponse>(url, data);
  },
  signUpArtist(data: IAuthPayload) {
    const url = "/auth/sign-up-artist";
    return axiosClent.post<unknown, IAuthResponse>(url, data);
  },
  signInArtist(data: IAuthPayload) {
    const url = "/auth/sign-in-artist";
    return axiosClent.post<unknown, IAuthResponse>(url, data);
  },
};
