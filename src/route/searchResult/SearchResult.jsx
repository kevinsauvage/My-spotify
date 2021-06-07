import "./SearchResult.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const SearchResult = () => {
  const location = useLocation();
  const { items } = location.state;
  const { setUri } = useContext(AppContext);

  const handlePlay = () => {
    const uris = items.tracks.items.map((item) => item.uri);
    setUri(uris);
  };

  return (
    <div className="search-result">
      <div className="search-result__tracks">
        <BibliothequeTitle title="Search result" />
        <PlayBtn onClick={handlePlay} />
        <Tracks data={items?.tracks.items} />
      </div>
      <div className="search-result__wrapper">
        <Playlists data={items?.playlists.items} />
        <Artists data={items?.artists.items} />
      </div>
    </div>
  );
};

export default SearchResult;
