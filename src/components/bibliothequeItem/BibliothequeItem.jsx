import { memo, useRef } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { BsFillTriangleFill } from "react-icons/bs";
import {
  MdAddCircleOutline,
  MdDeleteSweep,
  MdPlayCircleFilled,
} from "react-icons/md";
import { Link } from "react-router-dom";
import "./BibliothequeItem.scss";
import PlaylistModal from "../playlistModal/PlaylistModal";
import BibliothequeItemLogic from "./BibliothequeItemLogic";
import millisToMinutesAndSeconds from "../../helpers/millisToMinutesAndSeconds.js";
import { motion } from "framer-motion";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";

const BibliothequeItem = ({
  name,
  artist,
  duration,
  playlistId,
  trackId,
  popularity,
  uri,
  owner,
  artistId,
  albumId,
  playlistName,
  albumName,
  year,
  play,
  followedAlbum,
  followed,
}) => {
  const menu = useRef();
  const iconMenu = useRef();

  const {
    handleClickAddToPlaylist,
    displayPlaylistModal,
    setDisplayPlaylistModal,
    handleClickPlaylist,
    handleClickMenu,
    showMenu,
    getRecommendationsTrack,
    addToQueu,
    unSaveTrack,
    saveTrack,
    unSaveAlbum,
    saveAlbum,
  } = BibliothequeItemLogic(menu, iconMenu, trackId, albumId);

  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={"bibliotheque-item"}>
      {trackId && (
        <div className="bibliotheque-item__iconHeart">
          {followed ? (
            <RiHeartFill onClick={() => unSaveTrack(trackId)} size={20} />
          ) : (
            <RiHeartLine onClick={() => saveTrack(trackId)} size={20} />
          )}
        </div>
      )}
      {name && (
        <Link
          className="bibliotheque-item__name"
          to={{
            pathname: `/track/${trackId}`,
            state: {
              id: trackId,
            },
          }}>
          <p>{name}</p>
        </Link>
      )}
      {playlistId && (
        <Link
          className="bibliotheque-item__name"
          to={{
            pathname: `/Playlists/${playlistId}`,
            state: {
              id: playlistId,
            },
          }}>
          <p>{playlistName}</p>
        </Link>
      )}
      {albumName && (
        <Link
          className="bibliotheque-item__name"
          to={{
            pathname: `/Albums/${albumId}`,
            state: {
              id: albumId,
            },
          }}>
          <p>{albumName}</p>
        </Link>
      )}
      {artist && (
        <Link
          className="bibliotheque-item__artist"
          to={{
            pathname: `/Artists/${artistId}`,
            state: {
              id: artistId,
            },
          }}>
          <p>{artist}</p>
        </Link>
      )}
      {duration && (
        <p className="bibliotheque-item__duration">
          {millisToMinutesAndSeconds(duration)}
        </p>
      )}
      {year && <p className="bibliotheque-item__year">{year}</p>}
      {popularity && (
        <p className="bibliotheque-item__popularity">{popularity}</p>
      )}
      {owner && <p className="bibliotheque-item__owner">{owner}</p>}
      {play && (
        <div
          onClick={getRecommendationsTrack}
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
            <p onClick={addToQueu}>Add to Queu</p>
          </div>
          <div
            className="bibliotheque-item__add-to-playlist"
            onClick={handleClickAddToPlaylist}>
            <MdAddCircleOutline size={18} /> <p>Add to Playlist</p>
          </div>
        </div>
      )}
      {trackId && (
        <p className="bibliotheque-item__queu-icon" ref={iconMenu}>
          <CgPlayListAdd size={20} onClick={handleClickMenu} />
        </p>
      )}
      {displayPlaylistModal && (
        <PlaylistModal
          setDisplayPlaylistModal={setDisplayPlaylistModal}
          handleClickPlaylist={(e) => handleClickPlaylist(e, uri)}
        />
      )}
      {albumId && (
        <div className="bibliotheque-item__addAlbum">
          {followedAlbum ? (
            <MdDeleteSweep onClick={() => unSaveAlbum(albumId)} size={20} />
          ) : (
            <IoMdAddCircleOutline
              onClick={() => saveAlbum(albumId)}
              size={20}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default memo(BibliothequeItem);
