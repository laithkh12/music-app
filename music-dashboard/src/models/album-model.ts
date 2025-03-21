export interface IAlbum {
  _id: string;
  title: string;
  songs: string[];
  releaseDate: string;
  artistName: string;
  artistBio: string;
}

export interface IAlbumPayload {
  title: string;
  releaseDate: string;
}

export interface IAddSongsPayload {
  albumId: string;
  songIds: string[];
}

export interface IAlbumsResponse {
  message: string;
  data: IAlbum;
}

export interface IAlbumResponse {
  message: string;
  data: IAlbum;
}
