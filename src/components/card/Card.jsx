import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Card.scss";

const Card = ({ url, name, artist }) => {
  const [nameMaxLength, setNameMaxLength] = useState();

  useEffect(() => {
    if (window.innerWidth <= 548) {
      setNameMaxLength(18);
    } else {
      setNameMaxLength(30);
    }
  }, []);

  return (
    <motion.div
      className="card"
      whileHover={{ scale: 1.3 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}>
      <div
        className="card__img"
        style={{
          backgroundImage: "url(" + url + ")",
        }}></div>
      <div className="card__detail">
        <h2 className="card__name">
          {name.length > nameMaxLength
            ? name.substring(0, nameMaxLength) + "..."
            : name}
        </h2>
        <p className="card__artist">{artist}</p>
      </div>
    </motion.div>
  );
};

export default Card;
