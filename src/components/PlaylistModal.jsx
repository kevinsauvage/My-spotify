import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "../assets/stylesheets/PlaylistModal.scss";
import { RiCloseCircleFill } from "react-icons/ri";

const PlaylistModal = ({ handleClickPlaylist, setDisplayPlaylistModal }) => {
  const props = useContext(AppContext);
  const [userPlaylists, setUserPlaylists] = useState();

  useEffect(() => {
    const playlistuser = props.playlists.filter((playlist) => {
      return playlist.owner.id === props.user.id;
    });
    setUserPlaylists(playlistuser);
  }, []);
  const handleClickClose = () => {
    setDisplayPlaylistModal(false);
  };

  return (
    <div className="playlist-modal">
      <div className="playlist-modal__container">
        <div className="playlist-modal__icon-close" onClick={handleClickClose}>
          <RiCloseCircleFill size={20} />
        </div>
        <h2>Choose a playlist</h2>
        {userPlaylists &&
          userPlaylists.map((playlist) => (
            <div key={playlist.id} className="playlist-modal__item">
              <p data-id={playlist.id} onClick={handleClickPlaylist}>
                {playlist.name}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PlaylistModal;
