import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import AlbumShowLogic from "./AlbumShowLogic";
import "./AlbumShow.scss";

const AlbumShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const { setUri, album, tracks } = AlbumShowLogic(id);

  const bg =
    "linear-gradient(0deg, rgba(2,8,17,1) 0%, rgba(2,8,17,0.8687850140056023) 50%, rgba(2,8,17,0.6194852941176471) 100%)" +
    "," +
    "url(" +
    album?.images[0].url +
    ")";
  return (
    <div className="albumShow">
      <div className="albumShow__banner">
        <div className="albumShow__img">
          <div style={{ backgroundImage: bg }}></div>
        </div>
        <div className="albumShow__detail">
          <h1 className="albumShow__name">{album?.name}</h1>
          <div className="albumShow__btn">
            <PlayBtn onClick={() => setUri(album?.uri)} />
          </div>
          <p className="albumShow__description">{album?.release_date}</p>
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default AlbumShow;
