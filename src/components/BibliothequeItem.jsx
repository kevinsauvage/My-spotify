import React, { useContext, useEffect, useRef, useState } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AppContext } from "../context/AppContext";

import { BsFillTriangleFill } from "react-icons/bs";

import {
  MdAddCircleOutline,
  MdPlayCircleFilled,
  MdQueueMusic,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "../assets/stylesheets/BibliothequeItem.scss";
import PlaylistModal from "./PlaylistModal";

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
  const props = useContext(AppContext);

  const [showMenu, setShowMenu] = useState(false);
  const [displayPlaylistModal, setDisplayPlaylistModal] = useState(false);

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

  const handleClickAddToQueu = (e) => {
    addToQueu(e);
    setShowMenu(false);
  };

  const handleClickAddToPlaylist = (e) => {
    setDisplayPlaylistModal(true);
  };

  const handleClickPlaylist = (e) => {
    const playlistId = e.currentTarget.dataset.id;
    props.addTrackToPlaylist(playlistId, uri);
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<p class='span-copied'>Correctly added !</p>"
    );
    setTimeout(() => {
      setDisplayPlaylistModal(false);
    }, 1100);
    props.getUserPlaylists();
  };
  return (
    <div className="bibliotheque-item">
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
          {showMenu && (
            <div className="bibliotheque-item__menu" ref={menu}>
              <BsFillTriangleFill
                className="arrow-icon"
                style={{ position: "absolute", top: "-8px", right: "5px" }}
              />
              <div className="bibliotheque-item__add-to-queu">
                <MdQueueMusic size={18} />
                <p data-uri={uri} onClick={handleClickAddToQueu}>
                  Add to Queu
                </p>
              </div>
              <div
                className="bibliotheque-item__add-to-playlist"
                onClick={handleClickAddToPlaylist}>
                <MdAddCircleOutline size={18} /> <p>Add to Playlist</p>
              </div>
            </div>
          )}

          {preview && <p>{preview}</p>}
          {id && (
            <p className="queu-icon" ref={iconMenu} onClick={handleClickMenu}>
              <CgPlayListAdd size={20} />
            </p>
          )}
          {queu && (
            <BiDotsHorizontalRounded size={18} style={{ marginRight: "5px" }} />
          )}
        </div>
      </div>
      {displayPlaylistModal && (
        <PlaylistModal
          setDisplayPlaylistModal={setDisplayPlaylistModal}
          handleClickPlaylist={handleClickPlaylist}
        />
      )}
    </div>
  );
};

export default BibliothequeItem;
