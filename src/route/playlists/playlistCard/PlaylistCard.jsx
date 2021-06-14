import { motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

const PlaylistCard = ({
  selectPlaylistFn,
  name,
  url,
  id,
  idSelectedPlaylist,
  height,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();
  const [isFollowingPlaylist, setIsFollowingPlaylist] = useState();
  const { spotifyApi, checkIfPlaylistIsFollowed, getUserPlaylists } =
    useContext(AppContext);

  const isFollowed = useCallback(async () => {
    const response = await checkIfPlaylistIsFollowed(id);
    setIsFollowingPlaylist(response);
  }, [checkIfPlaylistIsFollowed, id]);

  useEffect(() => {
    id && isFollowed();
  }, [isFollowed, id]);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(18);
    } else {
      setNameMaxLength(30);
    }
  }, []);

  const followPlaylist = () => {
    spotifyApi.followPlaylist(id);
    setTimeout(() => {
      isFollowed();
      getUserPlaylists();
    }, 500);
  };

  const unfollowPlaylist = () => {
    spotifyApi.unfollowPlaylist(id);
    setTimeout(() => {
      isFollowed();
      getUserPlaylists();
    }, 500);
  };

  return (
    <motion.div
      className="artistCard"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={selectPlaylistFn ? () => selectPlaylistFn(id) : null}
        className="artistCard__img"
        style={{
          transform: idSelectedPlaylist === id ? "translateY(-20px)" : null,

          backgroundImage: "url(" + url + ")",
          boxShadow:
            idSelectedPlaylist === id
              ? "0px 50px 50px -6px rgba(195,184,255,0.2)"
              : null,
          height: height,
          cursor: selectPlaylistFn ? "pointer" : "default",
        }}>
        {isFollowingPlaylist ? (
          <div
            onClick={() => unfollowPlaylist()}
            className="artistCard__unfollow">
            <RiUserUnfollowLine />
          </div>
        ) : (
          <div onClick={() => followPlaylist()} className="artistCard__follow">
            <RiUserFollowLine />
          </div>
        )}
      </div>
      <div className="artistCard__detail">
        <Link
          to={{
            pathname: `/Playlists/${id}`,
            state: {
              id: id,
            },
          }}
          key={id}>
          <h2 className="artistCard__name">
            {name.length > nameMaxLength
              ? name.substring(0, nameMaxLength) + "..."
              : name}
          </h2>
          <HiExternalLink color="white" />
        </Link>
      </div>
    </motion.div>
  );
};

export default PlaylistCard;
