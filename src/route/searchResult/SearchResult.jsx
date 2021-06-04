import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import "./SearchResult.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";

const SearchResult = () => {
  const {
    searchResults,
    setPlaylistToPlay,
    isLoading,
    playlistToPlay,
    setPlaylistUri,
  } = useContext(AppContext);

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
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            className="loader"
            key="child"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{ opacity: 0 }}>
            <Loader
              type="ThreeDots"
              color="#FFF"
              height={40}
              width={40}
              timeout={2000}
            />
          </motion.div>
        ) : (
          <>
            <div className="search-result__tracks">
              <BibliothequeTitle title="Search result" />
              {playlistToPlay && <PlayBtn onClick={setPlaylistUri} />}
              <Tracks data={tracks} />
            </div>
            <div className="search-result__wrapper">
              <Playlists data={playlistSearchResult} />
              <Artists data={searchResultArtist} />
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResult;
