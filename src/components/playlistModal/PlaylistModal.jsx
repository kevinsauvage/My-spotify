import "./PlaylistModal.scss";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CreatePlaylist from "../createplaylist/CreatePlaylist";

const PlaylistModal = ({ handleClickPlaylist, setDisplayPlaylistModal }) => {
  const { userPlaylists, user } = useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  const [displayCreatePlaylist, setDisplayCreatePlaylist] = useState(false);
  const handleClickClose = () => {
    setDisplayPlaylistModal(false);
  };

  useEffect(() => {
    const playlistsFromUser = userPlaylists.filter(
      (playlist) => playlist.item.owner.id === user.id
    );
    setPlaylists(playlistsFromUser);
  }, [userPlaylists, user]);

  return (
    <div className="playlist-modal">
      <h2 className="playlist-modal__title">Choose a playlist</h2>
      <div className="playlist-modal__wrapper">
        <div className="playlist-modal__icon-close" onClick={handleClickClose}>
          <RiCloseCircleFill size={20} />
        </div>
        {playlists &&
          playlists.map((playlist) => (
            <div key={playlist.item.id} className="playlist-modal__item">
              <p data-id={playlist.item.id} onClick={handleClickPlaylist}>
                {playlist.item.name}
              </p>
            </div>
          ))}
      </div>
      <div className="playlist-modal__wrapper">
        <div
          className="playlist-modal__new-btn"
          onClick={() => setDisplayCreatePlaylist(!displayCreatePlaylist)}>
          <h2>New playlist</h2>
          <MdAddCircleOutline size={20} color="white" />
        </div>
      </div>
      {displayCreatePlaylist && (
        <CreatePlaylist setDisplayCreatePlaylist={setDisplayCreatePlaylist} />
      )}
    </div>
  );
};

export default PlaylistModal;
