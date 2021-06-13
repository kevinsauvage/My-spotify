import { motion } from "framer-motion";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import "./AlbumCard.scss";

const AlbumCard = ({
  idSelectedAlbum,
  selectAlbumFn,
  id,
  url,
  height,
  width,
  name,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();
  const [isFollowingAlbum, setIsFollowingAlbum] = useState();
  const { unSaveAlbum, saveAlbum, fetchIsFollowingAlbum } =
    useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(18);
    } else {
      setNameMaxLength(30);
    }
  }, []);

  const checkIfAlbumIsFollowed = useCallback(async () => {
    const isFollowing = await fetchIsFollowingAlbum(id);
    setIsFollowingAlbum(isFollowing);
  }, [fetchIsFollowingAlbum, id]);

  useEffect(() => {
    id && checkIfAlbumIsFollowed();
  }, [checkIfAlbumIsFollowed, id]);

  const followAlbum = () => {
    saveAlbum(id);
    setTimeout(() => {
      checkIfAlbumIsFollowed();
    }, 500);
  };

  const unFollowAlbum = () => {
    unSaveAlbum(id);
    setTimeout(() => {
      checkIfAlbumIsFollowed();
    }, 500);
  };

  return (
    <motion.div
      className="albumCard"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={selectAlbumFn ? () => selectAlbumFn(id) : null}
        className="albumCard__img"
        style={{
          backgroundImage: "url(" + url + ")",
          transform: idSelectedAlbum === id ? "translateY(-20px)" : null,
          boxShadow:
            idSelectedAlbum === id
              ? "0px 50px 50px -6px rgba(195,184,255,0.2)"
              : null,
          height: height,
          width: width,
          cursor: selectAlbumFn ? "pointer" : "default",
        }}></div>
      <div className="albumCard__detail">
        <Link
          to={{
            pathname: `/Albums/${id}`,
            state: {
              id: id,
            },
          }}
          key={id}>
          <h2 className="albumCard__name">
            {name.length > nameMaxLength
              ? name.substring(0, nameMaxLength) + "..."
              : name}
          </h2>
          <HiExternalLink color="white" />
        </Link>
        {isFollowingAlbum ? (
          <div onClick={unFollowAlbum} className="albumCard__unfollow">
            <RiUserUnfollowLine />
          </div>
        ) : (
          <div onClick={followAlbum} className="albumCard__follow">
            <RiUserFollowLine />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AlbumCard;
