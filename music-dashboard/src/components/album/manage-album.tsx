import AlbumProvider from "../../context/album-context";
import AlbumDrawer from "./album-drawer";
import AlbumModal from "./album-modal";
import AlbumTable from "./album-table";

export default function ManageAlbum() {
  return (
    <AlbumProvider>
      <AlbumDrawer />
      <AlbumModal />
      <AlbumTable />
    </AlbumProvider>
  );
}
