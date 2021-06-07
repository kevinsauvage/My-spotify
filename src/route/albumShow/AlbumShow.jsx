import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";

const AlbumShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [album, setAlbum] = useState();
  const [tracks, setTracks] = useState();

  const { scrollbar, spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const settingAlbum = async () => {
      scrollTop(scrollbar);
      const album = await spotifyApi.getAlbum(id);
      setTracks(album.tracks.items);
      setAlbum(album);
    };
    settingAlbum();
  }, [spotifyApi, id, setTracks, setAlbum, scrollbar]);

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
