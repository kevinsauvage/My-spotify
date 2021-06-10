import { motion } from "framer-motion";
import "./Card.scss";

const Card = ({ url, name, artist }) => {
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
        <h2 className="card__name">{name}</h2>
        <p className="card__artist">{artist}</p>
      </div>
    </motion.div>
  );
};

export default Card;
