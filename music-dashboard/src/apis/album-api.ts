import {
  IAddSongsPayload,
  IAlbumPayload,
  IAlbumResponse,
  IAlbumsResponse,
} from "../models/album-model";
import axiosClent from "./axiosClient";

export const albumApi = {
  getAll() {
    const url = "/albums";
    return axiosClent.get<unknown, IAlbumsResponse>(url);
  },
  create(data: IAlbumPayload) {
    const url = "/albums";
    return axiosClent.post<unknown, IAlbumsResponse>(url, data);
  },
  addSongs(data: IAddSongsPayload) {
    const url = "/albums/add-songs";
    return axiosClent.post<unknown, IAlbumResponse>(url, data);
  },
  removeSongs(data: IAddSongsPayload) {
    const url = "/albums/remove-songs";
    return axiosClent.post<unknown, IAlbumResponse>(url, data);
  },
};
