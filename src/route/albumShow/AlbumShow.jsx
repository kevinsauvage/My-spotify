import { useLocation } from "react-router";
import Tracks from "../../components/tracks/Tracks";
import AlbumShowLogic from "./AlbumShowLogic";
import PageBanner from "../../components/pageBanner/PageBanner";

const AlbumShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const { setUri, album, tracks } = AlbumShowLogic(id);
  const bg = "url(" + album?.images[0].url + ")";

  return (
    <div className="albumShow">
      <PageBanner
        follower={undefined}
        data={album}
        bg={bg}
        onClick={() => setUri(album?.uri)}
      />
      <Tracks data={tracks} />
    </div>
  );
};

export default AlbumShow;
