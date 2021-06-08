import "./SearchResult.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import PageBanner from "../../components/pageBanner/PageBanner";

const SearchResult = () => {
  const location = useLocation();
  const { items } = location.state;
  const { setUri } = useContext(AppContext);

  const handlePlay = () => {
    const uris = items.tracks.items.map((item) => item.uri);
    setUri(uris);
  };
  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return (
    <div className="search-result">
      <PageBanner onClick={handlePlay} title="Search result" bg={bg} />
      <Tracks data={items?.tracks.items} />
      <div className="search-result__wrapper">
        <Playlists data={items?.playlists.items} />
        <Artists data={items?.artists.items} />
      </div>
    </div>
  );
};

export default SearchResult;
