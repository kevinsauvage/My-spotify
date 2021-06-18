import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { HiExternalLink } from "react-icons/hi";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Card.scss";

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
}) => {
  const [nameMaxLength, setNameMaxLength] = useState();

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
        transform: selected === id ? "translateY(-20px)" : null,
        boxShadow:
          selected === id ? "0px 50px 50px -6px rgba(195,184,255,0.2)" : null,
      }}
      className="card"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        onClick={() => setId && setId(id)}
        className="card__img"
        style={{
          backgroundImage: "url(" + url + ")",
          height: height,
          width: width,
          cursor: setId ? "pointer" : "default",
        }}></div>
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
      {artistName && <p className="card__artistName">{artistName}</p>}
      {followed ? (
        <div onClick={() => unSave(id)} className="card__save">
          <RiUserUnfollowLine size={15} />
        </div>
      ) : (
        <div onClick={() => save(id)} className="card__unSave">
          <RiUserFollowLine size={15} />
        </div>
      )}
    </motion.div>
  );
};

export default TrackCard;
