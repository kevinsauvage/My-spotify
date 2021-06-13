import { motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.scss";
import { HiExternalLink } from "react-icons/hi";
import { AppContext } from "../../../context/AppContext";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
const ArtistCard = ({
  url,
  name,
  idSelectedArtist,
  id,
  selectArtistFn,
  height,
  width,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();
  const [isFollowingArtist, setIsFollowingArtist] = useState();
  const { spotifyApi, settingFollowedArtists } = useContext(AppContext);

  const checkIfArtistIsFollowed = useCallback(async () => {
    const isFollowing = await spotifyApi.isFollowingArtists([id]);
    id && setIsFollowingArtist(isFollowing[0]);
  }, [spotifyApi, id]);

  useEffect(() => {
    checkIfArtistIsFollowed();
  }, [checkIfArtistIsFollowed]);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(15);
    } else {
      setNameMaxLength(18);
    }
  }, []);

  const followArtist = () => {
    spotifyApi.followArtists([id]);
    setTimeout(() => {
      settingFollowedArtists();
      checkIfArtistIsFollowed();
    }, 500);
  };

  const unfollowArtist = () => {
    spotifyApi.unfollowArtists([id]);
    setTimeout(() => {
      settingFollowedArtists();
      checkIfArtistIsFollowed();
    }, 500);
  };

  return (
    <motion.div
      style={{
        width: width,
      }}
      className="artistCard"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={selectArtistFn ? () => selectArtistFn(id) : null}
        className="artistCard__img"
        style={{
          backgroundImage: "url(" + url + ")",
          transform: idSelectedArtist === id ? "translateY(-20px)" : null,
          boxShadow:
            idSelectedArtist === id
              ? "0px 50px 50px -6px rgba(195,184,255,0.2)"
              : null,
          height: height,
          width: width,
          cursor: selectArtistFn ? "pointer" : "default",
        }}>
        {isFollowingArtist ? (
          <div
            onClick={() => unfollowArtist()}
            className="artistCard__unfollow">
            <RiUserUnfollowLine size={15} />
          </div>
        ) : (
          <div onClick={() => followArtist()} className="artistCard__follow">
            <RiUserFollowLine size={15} />
          </div>
        )}
      </div>
      <div className="artistCard__detail">
        <Link
          to={{
            pathname: `/Artists/${id}`,
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
          <HiExternalLink size={15} color="white" />
        </Link>
      </div>
    </motion.div>
  );
};

export default ArtistCard;
