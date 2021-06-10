import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import WentWrong from "../../components/wentWrong/WentWrong";
import { AppContext } from "../../context/AppContext";
import "./PlaylistShow.scss";

const PlaylistShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [playlist, setPlaylist] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, handleSidebarMenu, setUri } = useContext(AppContext);

  useEffect(() => {
    const fetchPlaylistContent = async (e) => {
      handleSidebarMenu();
      try {
        const playlist = await spotifyApi.getPlaylist(id, { limit: 100 });
        setPlaylist(playlist);
        const tracks = playlist.tracks.items.map((res) => res.track);
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    }; // Fetch the plyalist content when clickinng on playlist link
    fetchPlaylistContent();
  }, [spotifyApi, handleSidebarMenu, setTracks, id]);

  const bg = "url(" + playlist?.images[0].url + ")";

  return (
    <div className="playlistShow">
      {!error ? (
        <>
          <PageBanner
            data={playlist}
            bg={bg}
            onClick={() => setUri(playlist?.uri)}
          />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default PlaylistShow;
