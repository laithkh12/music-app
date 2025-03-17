import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { useGetAlbums } from "../../apis/react-query/album-react-query";
import { IAlbum } from "../../models/album-model";
import { formatDate } from "../../utils/date-util";
import { useAlbumContext } from "../../context/album-context";

export default function AlbumTable() {
  const { data: albums } = useGetAlbums();
  const { setOpenDrawer, setSelectedAlbum } = useAlbumContext();

  const columns: TableProps<IAlbum>["columns"] = [
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
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const handleClick = () => {
          setOpenDrawer(true);
          setSelectedAlbum(record);
        };

        return (
          <Space size="middle">
            <Button
              type="primary"
              style={{ backgroundColor: "#0098fdea" }}
              onClick={handleClick}
            >
              Info
            </Button>
          </Space>
        );
      },
    },
  ];

  // Ensure albums?.data is an array and map to add 'key' property
  const dataSource: IAlbum[] = Array.isArray(albums?.data)
    ? albums.data.map((album) => ({
        key: album._id, // Ensure key exists for React list rendering
        ...album,
      }))
    : [];

  return <Table<IAlbum> columns={columns} dataSource={dataSource} />;
}
