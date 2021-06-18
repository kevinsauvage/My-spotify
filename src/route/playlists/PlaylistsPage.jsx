import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import WentWrong from "../../components/wentWrong/WentWrong";
import { AppContext } from "../../context/AppContext";
import "./PlaylistsPage.scss";
import Tracks from "../../components/tracks/Tracks";

const CarouselComponent = lazy(() =>
  import("../../components/carousel/CarouselComponent")
); // Lazy-loaded

const PlaylistsPage = () => {
  const [id, setId] = useState();
  const [playlistSelected, setPlaylistSelected] = useState();
  const [error, setError] = useState(false);
  const [playlistTracks, setPlaylistTracks] = useState();
  const [showFeaturedPlaylist, setShowFeaturedPlaylist] = useState(true);
  const [showUserPlaylits, setShowUserPlaylits] = useState(false);

  const { spotifyApi, userPlaylists, featuredPlaylists, checkIfTrackIsSaved } =
    useContext(AppContext);

  useEffect(() => {
    featuredPlaylists && setId(featuredPlaylists?.[0]?.item?.id);
  }, [featuredPlaylists]);

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
        const playlistTracks = await spotifyApi.getPlaylistTracks(id, {
          limit: 50,
        });
        console.log(playlistTracks);
        const tracks = playlistTracks.items.map((item) => item.track);
        const trackWithFollow = await checkIfTrackIsSaved(tracks);
        setPlaylistTracks(trackWithFollow);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    id && getPlaylistTracks();
  }, [id, spotifyApi, checkIfTrackIsSaved]);

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
                <CarouselComponent
                  data={featuredPlaylists}
                  selected={playlistSelected?.id}
                  setId={setId}
                  link="Playlists"
                />
              </Suspense>
            )}
            {showUserPlaylits && (
              <Suspense fallback={<CardLoader />}>
                <CarouselComponent
                  data={userPlaylists}
                  selected={playlistSelected?.id}
                  setId={setId}
                  link="Playlists"
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
          </section>
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default PlaylistsPage;
