import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Button, message, Upload } from "antd";
import { useEffect, useState } from "react";
import { useUploadSongAudio } from "../../apis/react-query/song-react-query";
import { useSongContext } from "../../context/song-context";
import { useQueryClient } from "@tanstack/react-query";

export default function SongUploadAudio() {
  const uploadAudio = useUploadSongAudio();
  const [progress, setProgress] = useState(0);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { selectedSong, open, setSelectedSong } = useSongContext();
  const queryClinet = useQueryClient();

  const props: UploadProps = {
    name: "file",
    fileList,
    async customRequest(options) {
      if (!selectedSong) return;
      const { file, onSuccess, onError } = options;
      try {
        await uploadAudio.mutateAsync({
          id: selectedSong._id,
          audio: file as File,
          onProgress(value) {
            setProgress(value);
          },
        });
        onSuccess?.("ok");
        queryClinet.invalidateQueries({ queryKey: ["songs"] });
      } catch (error) {
        onError?.(error as Error);
      }
    },
    onChange(info) {
      setFileList(info.fileList);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  useEffect(() => {
    if (!open) {
      setProgress(0);
      setSelectedSong(null);
      setFileList([]);
    }
  }, [open]);

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
      {progress > 0 && <div>Uploading... {progress}%</div>}
    </Upload>
  );
}
