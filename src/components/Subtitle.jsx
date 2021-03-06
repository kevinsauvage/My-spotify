import { motion } from "framer-motion";
import React from "react";
import "../assets/stylesheets/Subtitle.scss";

const Subtitle = ({ text, onClick, id, name }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      data-id={id}
      data-name={name}
      className="subtitle"
      onClick={onClick}>
      <h3 className="subtitle__title">{text}</h3>
    </motion.div>
  );
};

export default Subtitle;
