import React, { Suspense, useContext, useEffect, useState } from "react";
import CardLoader from "../../components/cardLoader/CardLoader";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";
import WentWrong from "../../components/wentWrong/WentWrong";
import { AppContext } from "../../context/AppContext";
import Playlists from "../../components/playlists/Playlists";
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

  const { spotifyApi } = useContext(AppContext);

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
        console.log(error);
      }
    }; // Set Playlist to show on Playlist show page
    id && setPlaylistShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getPlaylistTracks = async () => {
      try {
        const playlistTracks = await spotifyApi.getPlaylistTracks(id);
        console.log(playlistTracks);
        const track = playlistTracks.items.map((item) => item.track);
        setPlaylistTracks(track);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    };
    id && getPlaylistTracks();
  }, [id, spotifyApi]);

  console.log(featuredPlaylists);
  return (
    <div className="playlistsPage">
      {!error ? (
        <>
          <div className="playlistsPage__carousel">
            <div className="playlistsPage__menu">
              <ClickableTitle title={`Featured Playlists`} />
            </div>
            <Suspense fallback={<CardLoader />}>
              <CarouselPlaylist
                data={featuredPlaylists}
                setId={setId}
                playlistSelected={playlistSelected}
              />
            </Suspense>
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
