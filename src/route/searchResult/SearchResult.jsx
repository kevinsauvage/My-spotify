import "./SearchResult.scss";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";
import { useContext, useEffect, useState } from "react";
import PageBanner from "../../components/pageBanner/PageBanner";
import WentWrong from "../../components/wentWrong/WentWrong";

const SearchResult = () => {
  const location = useLocation();
  const { items } = location.state;
  const { setUri } = useContext(AppContext);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (location.state.items.tracks.total === 0) {
      setError(true);
    } else {
      setError(false);
    }
  }, [location]);

  const handlePlay = () => {
    const uris = items.tracks.items.map((item) => item.uri);
    setUri(uris);
  };
  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return (
    <div className="search-result">
      {!error ? (
        <>
          <PageBanner onClick={handlePlay} title="Search result" bg={bg} />
          <Tracks data={items?.tracks.items} />
          <div className="search-result__wrapper">
            <Playlists data={items?.playlists.items} />
            <Artists data={items?.artists.items} />
          </div>
        </>
      ) : (
        <WentWrong title="Oups... Nothing was found!" />
      )}
    </div>
  );
};

export default SearchResult;
