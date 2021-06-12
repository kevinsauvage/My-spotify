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
  width,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();
  const [isFollowingPlaylist, setIsFollowingPlaylist] = useState();
  const { spotifyApi } = useContext(AppContext);

  const checkIfPlaylistIsFollowed = useCallback(async () => {
    try {
      const isFollowing = await spotifyApi.followPlaylist(id);
      id && setIsFollowingPlaylist(isFollowing[0]);
    } catch (error) {
      console.log(error.message);
    }
  }, [spotifyApi, id]);

  useEffect(() => {
    checkIfPlaylistIsFollowed();
  }, [checkIfPlaylistIsFollowed]);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(18);
    } else {
      setNameMaxLength(30);
    }
  }, []);

  const followPlaylist = () => {};
  const unfollowPlaylist = () => {};

  return (
    <motion.div
      className="artistCard"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={selectPlaylistFn ? () => selectPlaylistFn(id) : null}
        className="artistCard__img"
        style={{
          backgroundImage: "url(" + url + ")",
          transform: idSelectedPlaylist === id ? "translateY(-20px)" : null,
          boxShadow:
            idSelectedPlaylist === id
              ? "0px 50px 50px -6px rgba(195,184,255,0.2)"
              : null,
          height: height,
          width: width,
          cursor: selectPlaylistFn ? "pointer" : "default",
        }}></div>
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
    </motion.div>
  );
};

export default PlaylistCard;
