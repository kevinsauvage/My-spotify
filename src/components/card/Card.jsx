import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Card.scss";
import Colors from "./colorsArray";

const TrackCard = ({
  url,
  selected,
  id,
  setId,
  height,
  width,
  followed,
  name,
  artistName,
  save,
  unSave,
  link,
  playlistName,
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(15);
    } else {
      setNameMaxLength(18);
    }
  }, []);

  const styleWithImage = {
    backgroundImage: "url(" + url + ")",
    height: height,
    width: width,
    cursor: setId ? "pointer" : "default",
  };
  const styleWithoutImage = {
    background: Colors[Math.ceil(Math.random() * 250)],
    height: height,
    width: width,
    cursor: setId ? "pointer" : "default",
  };

  return (
    <motion.div
      style={{
        width: width,
        transform: selected === id ? "translateY(-20px)" : null,
        boxShadow:
          selected === id ? "0px 30px 30px -10px rgba(195,184,255,0.2)" : null,
      }}
      className="card"
      whileHover={{ scale: 1.2 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={() => setId && setId(id)}
        className="card__img"
        style={url ? styleWithImage : styleWithoutImage}></div>
      {link && name && (
        <div className="card__detail">
          <Link
            to={{
              pathname: `/${link}/${id}`,
              state: {
                id: id,
              },
            }}>
            <h2 className="card__name">
              {name?.length > nameMaxLength
                ? name?.substring(0, nameMaxLength) + "..."
                : name}
            </h2>
            <HiExternalLink size={15} color="white" />
          </Link>
        </div>
      )}
      <div className="card__detail">
        {link && playlistName && (
          <Link
            to={{
              pathname: `/${link}/${id}`,
              state: {
                id: id,
              },
            }}>
            <h2 className="card__playlist-name">{playlistName}</h2>
            <HiExternalLink size={15} color="white" />
          </Link>
        )}
        {!link && playlistName && (
          <h2 className="card__playlist-name">{playlistName}</h2>
        )}
        {artistName && <p className="card__artistName">{artistName}</p>}
        {link !== "Playlists" &&
          link !== "Categories" &&
          link &&
          (followed ? (
            <div onClick={() => unSave(id)} className="card__save">
              <RiUserUnfollowLine size={15} />
            </div>
          ) : (
            <div onClick={() => save(id)} className="card__unSave">
              <RiUserFollowLine size={15} />
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default TrackCard;
