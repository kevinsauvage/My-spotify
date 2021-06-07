import { useRef, useContext } from "react";
import { CgPlayListAdd } from "react-icons/cg";
import { BsFillTriangleFill } from "react-icons/bs";
import { MdAddCircleOutline, MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import "./BibliothequeItem.scss";
import PlaylistModal from "../playlistModal/PlaylistModal";
import BibliothequeItemLogic from "./BibliothequeItemLogic";
import { AppContext } from "../../context/AppContext";
import millisToMinutesAndSeconds from "../../helpers/millisToMinutesAndSeconds.js";

const BibliothequeItem = ({
  name,
  artist,
  duration,
  trackId,
  popularity,
  uri,
  owner,
  artistId,
  albumId,
  albumName,
  year,
  play,
}) => {
  const menu = useRef();
  const iconMenu = useRef();

  const { setUri, spotifyApi } = useContext(AppContext);

  const {
    handleClickAddToPlaylist,
    displayPlaylistModal,
    setDisplayPlaylistModal,
    handleClickPlaylist,
    handleClickMenu,
    showMenu,
  } = BibliothequeItemLogic(menu, iconMenu);

  const getRecommendationsTrack = async () => {
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: trackId,
      limit: 50,
    });
    const uris = tracks.tracks.map((track) => track.uri);
    const track = await spotifyApi.getTrack(trackId);
    setUri([track.uri, ...uris]);
  };

  const addToQueu = async () => {
    const track = await spotifyApi.getTrack(trackId);
    spotifyApi.queue(track.uri);
  }; // Adding track to queue

  return (
    <div className={"bibliotheque-item"}>
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
      {albumName && (
        <Link
          className="bibliotheque-item__name"
          to={{
            pathname: `/album/${albumId}`,
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
            pathname: `/artist/${artistId}`,
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
          onClick={() => getRecommendationsTrack()}
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
