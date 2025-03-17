import { Button, Modal } from "antd";
import { useState } from "react";
import AlbumForm from "./album-form";

export default function AlbumModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Basic */}
      <Button type="primary" onClick={() => setOpen(true)}>
        Add New Album
      </Button>
      <Modal
        title="Add New Album"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={700}
      >
        <AlbumForm setOpen={setOpen} />
      </Modal>
    </>
  );
}
