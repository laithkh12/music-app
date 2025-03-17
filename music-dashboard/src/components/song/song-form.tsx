import { DatePicker, Form, FormInstance, FormProps, Input, Select } from "antd";
import { useGetGenres } from "../../apis/react-query/genre-react-query";
import {
  useCreateSong,
  useUpdateSong,
} from "../../apis/react-query/song-react-query";
import { ISongPayload } from "../../models/song-model";
import { formatDateForPayload } from "../../utils/date-util";
import { useGetCurrentUser } from "../../apis/react-query/user-react-query";
import { useNotificationContext } from "../../context/notification";
import { useQueryClient } from "@tanstack/react-query";
import { useSongContext } from "../../context/song-context";
import { useEffect } from "react";
import dayjs from "dayjs";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

interface ISongFormProps {
  form: FormInstance<ISongPayload>;
}

export default function SongForm({ form }: ISongFormProps) {
  const queryClient = useQueryClient();
  const notification = useNotificationContext();
  const { data: genres, isLoading } = useGetGenres();
  const createSong = useCreateSong();
  const { data: me } = useGetCurrentUser();
  const { selectedSong, setOpenModal } = useSongContext();
  const updateSong = useUpdateSong();

  const artistId = me?.data._id || "";

  const options = genres?.data.map((genre) => ({
    value: genre.name,
    label: genre.name,
  }));
  const handleFinish: FormProps<ISongPayload>["onFinish"] = async (values) => {
    const data = {
      ...values,
      artist: artistId,
      releaseDate: formatDateForPayload(values.releaseDate),
    };
    if (selectedSong) {
      await updateSong.mutateAsync({ id: selectedSong._id, data });
      notification.success("Song Updated Successfully");
    } else {
      await createSong.mutateAsync(data);
      notification.success("New Song Created Successfully");
    }
    setOpenModal(false);
    queryClient.invalidateQueries({ queryKey: ["songs"] });
  };

  useEffect(() => {
    if (selectedSong) {
      form.setFieldValue("title", selectedSong.title);
      form.setFieldValue("genre", selectedSong.genre);
      form.setFieldValue("releaseDate", dayjs(selectedSong.releaseDate));
    } else {
      form.resetFields();
    }
  }, [selectedSong]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={"filled"}
      style={{ maxWidth: 600, margin: "0 auto" }}
      initialValues={{ variant: "filled" }}
      onFinish={handleFinish}
    >
      <Form.Item<ISongPayload>
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input />
      </Form.Item>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <Form.Item<ISongPayload>
          label="Genre"
          name="genre"
          rules={[{ required: true, message: "Please input!" }]}
        >
          <Select options={options} />
        </Form.Item>
      )}

      <Form.Item<ISongPayload>
        label="DatePicker"
        name="releaseDate"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <DatePicker />
      </Form.Item>
    </Form>
  );
}
