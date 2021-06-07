import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import "./Bibliotheque.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";

const Bibliotheque = () => {
  const {
    description,
    nameB,
    followers,
    playlistToPlay,
    setPlaylistUri,
    tracks,
  } = useContext(AppContext);

  return (
    <div className="bibliotheque">
      <div className="bibliotheque__banner">
        <div className="bibliotheque__description">
          <h1 className="bibliotheque__name">{nameB}</h1>
          {description && (
            <h2 className="bibliotheque__playlist-detail">{description}</h2>
          )}
          {followers && <p className="bibliotheque__followers">{followers}</p>}
          {playlistToPlay && <PlayBtn onClick={setPlaylistUri} />}
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default Bibliotheque;
