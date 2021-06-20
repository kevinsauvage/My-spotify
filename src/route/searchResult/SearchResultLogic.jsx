import { useContext, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchResultLogic = () => {
  const location = useLocation();
  const { tracks, artists, playlists } = location.state;

  const { setUri } = useContext(AppContext);
  const [error, setError] = useState(false);

  const handlePlay = () => {
    const uris = tracks.map((track) => track.item.uri);
    setUri(uris);
  };
  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return { bg, handlePlay, error, tracks, artists, playlists };
};

export default SearchResultLogic;
