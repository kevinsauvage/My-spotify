import { useContext, useEffect, useState } from "react";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import "./SearchResult.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";

const SearchResult = () => {
  const {
    searchResults,
    setPlaylistToPlay,
    isLoading,
    playlistToPlay,
    setPlaylistUri,
    millisToMinutesAndSeconds,
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
              <h1 className="search-result__tracks__title">Search result</h1>
              {playlistToPlay && <PlayBtn onClick={setPlaylistUri} />}
              <div className="section-header">
                <BibliothequeItemHeader name artist duration play queu />
              </div>
              {tracks &&
                tracks.map((track) => {
                  return (
                    <BibliothequeItem
                      key={track.id}
                      id={track.id}
                      name={track.name}
                      artist={track.artists[0]?.name}
                      duration={millisToMinutesAndSeconds(track.duration_ms)}
                      artistId={track.artists[0]?.id}
                      uri={track.track ? track.track.uri : track.uri}
                      play
                    />
                  );
                })}
            </div>
            <div className="search-result__wrapper">
              <div className="search-result__playlists">
                <h1 className="search-result__playlists__title">Playlist</h1>
                <div className="section-header">
                  <BibliothequeItemHeader name owner play />
                </div>
                {playlistSearchResult &&
                  playlistSearchResult.map((playlist) => {
                    return (
                      <BibliothequeItem
                        key={playlist.id}
                        name={playlist.name && playlist.name}
                        owner={playlist.owner && playlist.owner.display_name}
                        playlistId={playlist.id}
                        play
                      />
                    );
                  })}
              </div>
              <div className="search-result__artists">
                <h1 className="search-result__tracks__title">Artist</h1>
                <div className="section-header">
                  <BibliothequeItemHeader artist popularity />
                </div>
                {searchResultArtist &&
                  searchResultArtist.map((artist) => {
                    return (
                      <BibliothequeItem
                        key={artist.id && artist.id}
                        artist={artist.name && artist.name}
                        popularity={artist.popularity && artist.popularity}
                        artistId={artist.id && artist.id}
                      />
                    );
                  })}
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchResult;
