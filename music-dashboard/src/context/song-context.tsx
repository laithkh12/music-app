import React, { createContext, useContext, useState } from "react";
import { ISong } from "../models/song-model";

interface ISongContext {
  selectedSong: ISong | null;
  setSelectedSong: (song: ISong | null) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  openModal: boolean;
  setOpenModal: (openModel: boolean) => void;
}

const SongContext = createContext<ISongContext | null>(null);

interface ISongProviderProps {
  children: React.ReactNode;
}

export default function SongProvider({ children }: ISongProviderProps) {
  const [selectedSong, setSelectedSong] = useState<ISong | null>(null);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <SongContext.Provider
      value={{
        selectedSong,
        setSelectedSong,
        open,
        setOpen,
        setOpenModal,
        openModal,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

export const useSongContext = () => {
  const context = useContext(SongContext);
  if (!context) throw new Error("Context error");
  return context;
};
