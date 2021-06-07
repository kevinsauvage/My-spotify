import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";
import scrollTop from "../../helpers/scrollTop";
import "./PlaylistShow.scss";

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
      const playlist = await spotifyApi.getPlaylist(id, { limit: 100 });
      setPlaylist(playlist);
      const tracks = playlist.tracks.items.map((res) => res.track);
      setTracks(tracks);
    }; // Fetch the plyalist content when clickinng on playlist link
    fetchPlaylistContent();
  }, [spotifyApi, handleSidebarMenu, setTracks, id, scrollbar]);

  const bg =
    "linear-gradient(0deg, rgba(2,8,17,1) 0%, rgba(2,8,17,0.8687850140056023) 50%, rgba(2,8,17,0.6194852941176471) 100%)" +
    "," +
    "url(" +
    playlist?.images[0].url +
    ")";
  return (
    <div className="playlistShow">
      <div className="playlistShow__banner">
        <div className="playlistShow__img">
          <div style={{ backgroundImage: bg }}></div>
        </div>
        <div className="playlistShow__detail">
          <h1 className="playlistShow__name">{playlist?.name}</h1>
          <div className="playlistShow__btn">
            <PlayBtn onClick={() => setUri(playlist?.uri)} />
          </div>
          <p className="playlistShow__description">{playlist?.description}</p>
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default PlaylistShow;
