import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";

const PlaylistShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [playlist, setPlaylist] = useState();
  const { spotifyApi, scrollbar, handleSidebarMenu, setUri } =
    useContext(AppContext);

  useEffect(() => {
    const fetchPlaylistContent = async (e) => {
      scrollTop(scrollbar);
      handleSidebarMenu();
      const playlist = await spotifyApi.getPlaylist(id);
      setPlaylist(playlist);
      const tracks = playlist.tracks.items.map((res) => res.track);
      setTracks(tracks);
    }; // Fetch the plyalist content when clickinng on playlist link
    fetchPlaylistContent();
  }, [spotifyApi, handleSidebarMenu, setTracks, id, scrollbar]);

  return (
    <div className="bibliotheque">
      <div className="bibliotheque__banner">
        <div className="bibliotheque__description">
          <h1 className="bibliotheque__name">Playlist</h1>
          <PlayBtn onClick={() => setUri(playlist.uri)} />
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default PlaylistShow;
