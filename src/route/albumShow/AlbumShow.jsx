import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import AlbumShowLogic from "./AlbumShowLogic";

const AlbumShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const { setUri, album, tracks } = AlbumShowLogic(id);

  return (
    <div className="bibliotheque">
      <div className="bibliotheque__banner">
        <div className="bibliotheque__description">
          <h1 className="bibliotheque__name">Albums</h1>
          <PlayBtn onClick={() => setUri(album?.uri)} />
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default AlbumShow;
