import React, { useEffect, useRef, useState } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { icons } from "react-icons/lib";
import {
  MdAddCircleOutline,
  MdPlayCircleFilled,
  MdPlaylistAddCheck,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../assets/stylesheets/BibliothequeItem.scss";

const BibliothequeItem = ({
  name,
  artistName,
  minute,
  id,
  onClick,
  uri,
  onClickArtist,
  preview,
  artistId,
  playlist,
  setTrackToPlay,
  onClickPlaylist,
  albumId,
  albumName,
  queu,
  addToQueu,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menu = useRef();
  const iconMenu = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  const handleClickMenu = (e) => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (iconMenu.current && !iconMenu.current.contains(event.target)) {
      if (menu.current && !menu.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
  };
  return (
    <div className="bibliotheque-item">
      {showMenu && (
        <div className="bibliotheque-item__menu" ref={menu}>
          <div className="bibliotheque-item__add-to-queu">
            <MdPlaylistAddCheck size={20} />
            <p data-uri={uri} onClick={addToQueu}>
              Add To Queu
            </p>
          </div>
          <div className="bibliotheque-item__add-to-playlist">
            <MdAddCircleOutline size={20} /> <p>Add to Playlist</p>
          </div>
        </div>
      )}
      <div className="bibliotheque-item__wrapper">
        {name && (
          <Link to="/Track" onClick={onClick} data-id={id}>
            <p className="bibliotheque-item__name">{name}</p>
          </Link>
        )}
        {albumName && (
          <Link to="/Biblio" onClick={onClick} data-id={albumId}>
            <p className="bibliotheque-item__name">{albumName}</p>
          </Link>
        )}
        {artistId && (
          <Link to="/Artist" onClick={onClickArtist} data-id={artistId}>
            <p className="bibliotheque-item__artist">{artistName}</p>
          </Link>
        )}
        {playlist && (
          <Link to="/Biblio" onClick={onClickPlaylist} data-name={playlist}>
            <p className="bibliotheque-item__artist">{playlist}</p>
          </Link>
        )}
      </div>
      <div className="bibliotheque-item__wrapper-right">
        {minute && <p className="bibliotheque-item__time">{minute}</p>}
        <div className="btn">
          <div
            onClick={setTrackToPlay}
            data-id={id}
            data-uri={uri}
            className="preview__btn">
            <MdPlayCircleFilled size={20} />
          </div>
          {preview && <p>{preview}</p>}
          {id && (
            <p className="queu-icon" ref={iconMenu} onClick={handleClickMenu}>
              <CgPlayListAdd size={20} />
            </p>
          )}
          {queu && <p>{queu}</p>}
        </div>
      </div>
    </div>
  );
};

export default BibliothequeItem;
