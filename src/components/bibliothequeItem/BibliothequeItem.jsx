import { useContext, useRef } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { BsFillTriangleFill } from "react-icons/bs";
import { MdAddCircleOutline, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import "./BibliothequeItem.scss";
import PlaylistModal from "../playlistModal/PlaylistModal";
import BibliothequeItemLogic from "./BibliothequeItemLogic";
import { AppContext } from "../../context/AppContext";

const BibliothequeItem = ({
  name,
  artist,
  duration,
  id,
  popularity,
  onClick,
  uri,
  owner,
  onClickArtist,
  artistId,
  setTrackToPlay,
  albumId,
  albumName,
  year,
  play,
  addToQueu,
}) => {
  const props = useContext(AppContext);
  const menu = useRef();
  const iconMenu = useRef();

  const {
    handleClickAddToPlaylist,
    displayPlaylistModal,
    setDisplayPlaylistModal,
    handleClickPlaylist,
    handleClickMenu,
    handleClickAddToQueu,
    showMenu,
  } = BibliothequeItemLogic(menu, iconMenu, addToQueu);
  return (
    <div
      className="bibliotheque-item"
      style={{
        backgroundColor: props.trackCurrentlyPlayed === name ? "#192131" : null,
      }}>
      {name && (
        <Link
          className="bibliotheque-item__name"
          to="/Track"
          onClick={onClick}
          data-id={id}>
          <p>{name}</p>
        </Link>
      )}
      {albumName && (
        <Link
          className="bibliotheque-item__name"
          to="/Biblio"
          onClick={onClick}
          data-id={albumId}>
          <p>{albumName}</p>
        </Link>
      )}
      {artist && (
        <Link
          className="bibliotheque-item__artist"
          to="/Artist"
          onClick={onClickArtist}
          data-id={artistId}>
          <p>{artist}</p>
        </Link>
      )}
      {duration && <p className="bibliotheque-item__duration">{duration}</p>}
      {year && <p className="bibliotheque-item__year">{year}</p>}
      {popularity && (
        <p className="bibliotheque-item__popularity">{popularity}</p>
      )}
      {owner && <p className="bibliotheque-item__owner">{owner}</p>}

      {play && (
        <div
          onClick={setTrackToPlay}
          data-id={id}
          data-uri={uri}
          className="bibliotheque-item__play">
          <MdPlayCircleFilled size={20} />
        </div>
      )}

      {showMenu && (
        <div className="bibliotheque-item__menu" ref={menu}>
          <BsFillTriangleFill
            className="arrow-icon"
            style={{ position: "absolute", top: "-8px", right: "5px" }}
          />
          <div className="bibliotheque-item__add-to-queu">
            <MdAddCircleOutline size={18} />
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
      {id && (
        <p
          className="bibliotheque-item__queu-icon"
          ref={iconMenu}
          onClick={handleClickMenu}>
          <CgPlayListAdd size={20} />
        </p>
      )}

      {displayPlaylistModal && (
        <PlaylistModal
          setDisplayPlaylistModal={setDisplayPlaylistModal}
          handleClickPlaylist={(e) => handleClickPlaylist(e, uri)}
        />
      )}
    </div>
  );
};

export default BibliothequeItem;
