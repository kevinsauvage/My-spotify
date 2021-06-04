import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./SearchResult.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";

const SearchResult = () => {
  const { searchResults, setPlaylistToPlay, playlistToPlay, setPlaylistUri } =
    useContext(AppContext);

  const [searchResultArtist, setSearchResultArtist] = useState(); // array of search result arstis
  const [playlistSearchResult, setPlaylistSearchResult] = useState();
  const [tracks, setTracks] = useState([]); // tracks to display in biblio

  useEffect(() => {
    setSearchResultArtist(searchResults?.artists.items);
    setPlaylistSearchResult(searchResults?.playlists.items);
    setTracks(searchResults?.tracks.items);
    setPlaylistToPlay(searchResults?.tracks.items);
  }, [searchResults, setPlaylistToPlay]);

  return (
    <div className="search-result">
      <div className="search-result__tracks">
        <BibliothequeTitle title="Search result" />
        {playlistToPlay && <PlayBtn onClick={setPlaylistUri} />}
        <Tracks data={tracks} />
      </div>
      <div className="search-result__wrapper">
        <Playlists data={playlistSearchResult} />
        <Artists data={searchResultArtist} />
      </div>
    </div>
  );
};

export default SearchResult;
