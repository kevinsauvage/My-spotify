import React from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { MdPlayCircleFilled } from "react-icons/md";
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
}) => {
  const handleClickMenu = (e) => {
    console.log(e.currentTarget.getBoundingClientRect());
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
          {preview && <p>{preview}</p>}
          {id && (
            <p className="queu-icon" data-uri={uri} onClick={handleClickMenu}>
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
