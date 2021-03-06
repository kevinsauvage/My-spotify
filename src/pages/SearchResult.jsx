import React, { useContext } from "react";
import BibliothequeItem from "../components/BibliothequeItem";
import { AppContext } from "../context/AppContext";
import Loader from "react-loader-spinner";
import "../assets/stylesheets/pages/SearchResult.scss";
import PlayBtn from "../components/PlayBtn";
import { AnimatePresence, motion } from "framer-motion";

const SearchResult = () => {
  const props = useContext(AppContext);

  return (
    <div className="search-result">
      <AnimatePresence>
        {props.isLoading ? (
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
              <h1 className="search-result__tracks__title">Tracks</h1>
              {props.playlistToPlay && (
                <PlayBtn onClick={props.setPlaylistUri} />
              )}
              <div className="section-header">
                <BibliothequeItem
                  name="Name"
                  artist="Artist"
                  minute="Duration"
                  preview="Play"
                  queu="Queu"
                />
              </div>
              {props.tracks.map((track) => {
                return (
                  <BibliothequeItem
                    key={track.id}
                    onClick={props.setTrackShow}
                    id={track.id}
                    name={track.name}
                    artist={track.artists ? track.artists[0].name : null}
                    minute={props.millisToMinutesAndSeconds(track.duration_ms)}
                    href={track.preview_url}
                    onClickArtist={props.setArtistShow}
                    artistId={track.artists ? track.artists[0].id : null}
                    setTrackToPlay={props.setTrackToPlay}
                    uri={track.track ? track.track.uri : track.uri}
                    addToQueu={props.addToQueu}
                  />
                );
              })}
            </div>
            <div className="search-result__wrapper">
              <div className="search-result__playlists">
                <h1 className="search-result__playlists__title">Playlist</h1>
                <div className="section-header">
                  <BibliothequeItem
                    playlist="Name"
                    avatar="Cover"
                    minute="Owner"
                  />
                </div>
                {props.playlistSearchResult &&
                  props.playlistSearchResult.map((playlist) => {
                    return (
                      <BibliothequeItem
                        playlist={playlist.name && playlist.name}
                        minute={playlist.owner && playlist.owner.display_name}
                        id={playlist.id}
                        onClickPlaylist={props.fetchPlaylistContent}
                      />
                    );
                  })}
              </div>
              <div className="search-result__artists">
                <h1 className="search-result__tracks__title">Artist</h1>
                <div className="section-header">
                  <BibliothequeItem
                    artistName="Name"
                    minute="Popularity"
                    avatar="Cover"
                    artistId="0"
                  />
                </div>
                {props.searchResultArtist &&
                  props.searchResultArtist.map((artist) => {
                    return (
                      <BibliothequeItem
                        artistName={artist.name && artist.name}
                        minute={artist.popularity && artist.popularity}
                        onClickArtist={props.setArtistShow}
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
