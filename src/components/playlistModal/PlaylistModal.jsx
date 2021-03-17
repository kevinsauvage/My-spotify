import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import "./PlaylistModal.scss";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";

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
        <h2>Choose a playlist</h2>
        <div className="playlist-modal__wrapper">
          <div
            className="playlist-modal__icon-close"
            onClick={handleClickClose}>
            <RiCloseCircleFill size={20} />
          </div>
          {userPlaylists &&
            userPlaylists.map((playlist) => (
              <div key={playlist.id} className="playlist-modal__item">
                <p data-id={playlist.id} onClick={handleClickPlaylist}>
                  {playlist.name}
                </p>
              </div>
            ))}
        </div>
        <div className="playlist-modal__wrapper">
          <div className="playlist-modal__new-btn">
            <h2>New playlist</h2>
            <MdAddCircleOutline size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
