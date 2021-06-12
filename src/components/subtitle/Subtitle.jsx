import { motion } from "framer-motion";
import "./Subtitle.scss";

const Subtitle = ({ text, icon }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="subtitle">
      {icon}
      <h3 className="subtitle__title">{text}</h3>
    </motion.div>
  );
};

export default Subtitle;
