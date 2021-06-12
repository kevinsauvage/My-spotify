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
  const { spotifyApi } = useContext(AppContext);

  const checkIfArtistIsFollowed = useCallback(async () => {
    const isFollowing = await spotifyApi.isFollowingArtists([id]);
    id && setIsFollowingArtist(isFollowing[0]);
    console.log("eee");
  }, [spotifyApi, id]);

  useEffect(() => {
    checkIfArtistIsFollowed();
  }, [checkIfArtistIsFollowed]);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(18);
    } else {
      setNameMaxLength(30);
    }
  }, []);

  const followArtist = () => {
    spotifyApi.followArtists([id]);
    setTimeout(() => {
      checkIfArtistIsFollowed();
    }, 500);
  };

  const unfollowArtist = () => {
    spotifyApi.unfollowArtists([id]);
    setTimeout(() => {
      checkIfArtistIsFollowed();
    }, 500);
  };

  return (
    <motion.div
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
        }}></div>
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
          <HiExternalLink color="white" />
        </Link>
        {isFollowingArtist ? (
          <div
            onClick={() => unfollowArtist()}
            className="artistCard__unfollow">
            <RiUserUnfollowLine />
          </div>
        ) : (
          <div onClick={() => followArtist()} className="artistCard__follow">
            <RiUserFollowLine />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtistCard;
