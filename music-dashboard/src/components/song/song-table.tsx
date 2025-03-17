import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  useDeleteSong,
  useGetSongs,
  usePrefetchSongs,
} from "../../apis/react-query/song-react-query";
import { useGetCurrentUser } from "../../apis/react-query/user-react-query";
import { createBackendUrl, ITEMS_PER_PAGE } from "../../configs/app-config";
import { useNotificationContext } from "../../context/notification";
import { useSongContext } from "../../context/song-context";
import { ISong } from "../../models/song-model";
import { formatDate } from "../../utils/date-util";
import SongPopup from "./song-popup";

export default function SongTable() {
  const { setSelectedSong, setOpen, setOpenModal } = useSongContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [openId, setOpenId] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const deleteSong = useDeleteSong();
  const queryClient = useQueryClient();
  const notification = useNotificationContext();
  const { data: user } = useGetCurrentUser();

  const columns: TableProps<ISong>["columns"] = [
    {
      title: "Cover Image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (text) => (
        <img
          width={50}
          height={50}
          alt="Cover Image"
          src={createBackendUrl(`/songs/${text}`)}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Artist",
      dataIndex: "artistName",
      key: "artistName",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (text) => <span>{text?.toFixed(2)}</span>,
    },

    {
      title: "Genre",
      key: "genre",
      dataIndex: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (text) => <span>{formatDate(text)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleOpenUpload = () => {
          setSelectedSong(record);
          setOpen(true);
        };

        const handleOpenUpdate = () => {
          setSelectedSong(record);
          setOpenModal(true);
        };

        const showPopconfirm = () => {
          setOpenPopup(true);
          setOpenId(record._id);
        };

        const handleOk = async () => {
          setConfirmLoading(true);
          try {
            await deleteSong.mutateAsync(record._id);
            queryClient.invalidateQueries({ queryKey: ["songs"] });
            notification.success("Song Deleted Successfully");
          } catch (error) {
            console.log(error);
            notification.error("Falid to delete the song");
          }
          setConfirmLoading(false);
        };

        const isCurrentArtist = user?.data._id === record.artist;

        return (
          <Space size="middle">
            <Button
              onClick={handleOpenUpload}
              icon={<UploadOutlined />}
              disabled={!isCurrentArtist}
            ></Button>
            <Button
              onClick={handleOpenUpdate}
              type="default"
              style={{ color: "#0a3ee8" }}
              icon={<EditOutlined />}
              disabled={!isCurrentArtist}
            ></Button>
            <SongPopup
              open={openPopup && openId === record._id}
              setOpen={setOpenPopup}
              confirmLoading={confirmLoading}
              handleOk={handleOk}
            >
              <Button
                onClick={showPopconfirm}
                type="default"
                style={{ color: "red" }}
                icon={<DeleteOutlined />}
                disabled={!isCurrentArtist}
              ></Button>
            </SongPopup>
          </Space>
        );
      },
    },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const { data: songs, refetch, isLoading } = useGetSongs(page);

  usePrefetchSongs(page);

  const dataSource = songs?.data.map((song) => ({
    key: song._id,
    ...song,
  }));

  const handleChangePagination = (page: number, pageSize: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  useEffect(() => {
    if (!page || isNaN(page)) {
      setSearchParams({
        page: "1",
      });
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [searchParams]);

  return (
    <Table<ISong>
      columns={columns}
      dataSource={dataSource || []}
      loading={isLoading}
      pagination={{
        pageSize: ITEMS_PER_PAGE,
        total: songs?.pagination.total,
        onChange: handleChangePagination,
        current: page,
      }}
    />
  );
}
