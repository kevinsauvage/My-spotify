import React, { Suspense, useContext, useEffect, useState } from "react";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import WentWrong from "../../components/wentWrong/WentWrong";
import { AppContext } from "../../context/AppContext";
import "./PlaylistsPage.scss";
import Tracks from "../../components/tracks/Tracks";
const CarouselPlaylist = React.lazy(() =>
  import("./carouselPlaylist/CarouselPlaylist")
); // Lazy-loaded

const PlaylistsPage = () => {
  const [featuredPlaylists, setFeaturedPlaylists] = useState([]);
  const [id, setId] = useState();
  const [playlistSelected, setPlaylistSelected] = useState();
  const [error, setError] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState();
  const [showFeaturedPlaylist, setShowFeaturedPlaylist] = useState(true);
  const [showUserPlaylits, setShowUserPlaylits] = useState(false);

  const { spotifyApi, userPlaylists } = useContext(AppContext);

  useEffect(() => {
    const getFeaturedPlaylist = () => {
      spotifyApi
        .getFeaturedPlaylists({ limit: 20 })
        .then((data) => {
          setFeaturedPlaylists(data.playlists.items);
          setId(data.playlists.items[0].id);
        })
        .catch((error) => console.log(error));
    }; // Fetching featured playlist
    getFeaturedPlaylist();
  }, [spotifyApi]);

  useEffect(() => {
    const setPlaylistShow = async () => {
      try {
        const playlist = await spotifyApi.getPlaylist(id);
        setPlaylistSelected(playlist);
      } catch (error) {
        setError(true);
      }
    }; // Set Playlist selected
    id && setPlaylistShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getPlaylistTracks = async () => {
      try {
        const playlistTracks = await spotifyApi.getPlaylistTracks(id);
        const track = playlistTracks.items.map((item) => item.track);
        setPlaylistTracks(track);
      } catch (error) {
        setError(error);
        console.log(error);
      }
    };
    id && getPlaylistTracks();
  }, [id, spotifyApi]);

  const toggleFeaturedPlaylists = () => {
    setShowFeaturedPlaylist(true);
    setShowUserPlaylits(false);
  };
  const toggleUserPlaylists = () => {
    setShowFeaturedPlaylist(false);
    setShowUserPlaylits(true);
  };

  return (
    <div className="playlistsPage">
      {!error ? (
        <>
          <div className="playlistsPage__carousel">
            <div className="playlistsPage__menu">
              <ClickableTitle
                fn={toggleFeaturedPlaylists}
                condition={showFeaturedPlaylist}
                title={`Featured Playlists`}
              />
              <ClickableTitle
                fn={toggleUserPlaylists}
                condition={showUserPlaylits}
                title={`Your Playlists`}
              />
            </div>
            {showFeaturedPlaylist && (
              <Suspense fallback={<CardLoader />}>
                <CarouselPlaylist
                  data={featuredPlaylists}
                  setId={setId}
                  playlistSelected={playlistSelected}
                />
              </Suspense>
            )}
            {showUserPlaylits && (
              <Suspense fallback={<CardLoader />}>
                <CarouselPlaylist
                  data={userPlaylists}
                  setId={setId}
                  playlistSelected={playlistSelected}
                />
              </Suspense>
            )}
          </div>
          <section className="playlistsPage__content">
            <div className="playlistsPage__tracksContainer">
              <div className="playlistsPage__menu">
                <ClickableTitle title={`${playlistSelected?.name} Tracks`} />
              </div>
              <div className="playlistsPage__tracks">
                <Tracks data={playlistTracks} />
              </div>
            </div>
            {<div className="playlistsPage__relatedArtists"></div>}
          </section>
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default PlaylistsPage;
