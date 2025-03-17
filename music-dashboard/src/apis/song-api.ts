import { ITEMS_PER_PAGE } from "../configs/app-config";
import {
  ISongPayload,
  ISongResponse,
  ISongsResponse,
} from "../models/song-model";
import axiosClent from "./axiosClient";

export const songApi = {
  getAllSongs(page: number = 1, limit: number = ITEMS_PER_PAGE) {
    const url = `/songs?page=${page}&limit=${limit}`;
    return axiosClent.get<unknown, ISongsResponse>(url);
  },

  getMySongs(page: number = 1, limit: number = ITEMS_PER_PAGE) {
    const url = `/songs/me?page=${page}&limit=${limit}`;
    return axiosClent.get<unknown, ISongsResponse>(url);
  },

  create(data: ISongPayload) {
    const url = "/songs";
    return axiosClent.post<unknown, ISongResponse>(url, data);
  },

  update({ id, data }: { id: string; data: ISongPayload }) {
    const url = `/songs/${id}`;
    return axiosClent.patch<unknown, ISongResponse>(url, data);
  },

  delete(id: string) {
    const url = `/songs/${id}`;
    return axiosClent.delete<unknown, ISongResponse>(url);
  },

  uploadImage({
    id,
    image,
    onProgress,
  }: {
    id: string;
    image: File;
    onProgress: (value: number) => void;
  }) {
    const url = `/songs/${id}/upload-cover`;
    const formData = new FormData();
    formData.append("coverImage", image);
    return axiosClent.post<unknown, ISongResponse>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / (event.total || 1)) * 100);
        onProgress(percent);
      },
    });
  },
  uploadAudio({
    id,
    audio,
    onProgress,
  }: {
    id: string;
    audio: File;
    onProgress: (value: number) => void;
  }) {
    const url = `/songs/upload-audio`;
    const formData = new FormData();
    formData.append("songId", id);
    formData.append("audioFile", audio);
    return axiosClent.post<unknown, ISongResponse>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.floor((event.loaded / (event.total || 1)) * 100);
        onProgress(percent);
      },
    });
  },
};
