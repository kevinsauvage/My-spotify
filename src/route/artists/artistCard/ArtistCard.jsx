import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
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
  followed,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();
  const { followArtist, unfollowArtist } = useContext(AppContext);

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(15);
    } else {
      setNameMaxLength(18);
    }
  }, []);

  return (
    <motion.div
      style={{
        width: width,
        transform: idSelectedArtist === id ? "translateY(-20px)" : null,
        boxShadow:
          idSelectedArtist === id
            ? "0px 50px 50px -6px rgba(195,184,255,0.2)"
            : null,
      }}
      className="artistCard"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={() => selectArtistFn && selectArtistFn(id)}
        className="artistCard__img"
        style={{
          backgroundImage: "url(" + url + ")",
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
          <HiExternalLink size={15} color="white" />
        </Link>
        {followed ? (
          <div
            onClick={() => unfollowArtist(id)}
            className="artistCard__unfollow">
            <RiUserUnfollowLine size={15} />
          </div>
        ) : (
          <div onClick={() => followArtist(id)} className="artistCard__follow">
            <RiUserFollowLine size={15} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtistCard;
