import { motion } from "framer-motion";
import React from "react";
import "../assets/stylesheets/SectionTitle.scss";

const SectionTitle = ({ title, padding }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sectionTitle"
      style={{ padding: padding }}>
      <h2 className="sectionTitle__title">{title}</h2>
    </motion.div>
  );
};

export default SectionTitle;
