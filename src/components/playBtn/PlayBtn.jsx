import { motion } from "framer-motion";
import "./PlayBtn.scss";

const PlayBtn = ({ onClick }) => {
  return (
    <motion.div className="play-btn" whileHover={{ scale: 1.05 }}>
      <p onClick={onClick}>Start Playing</p>
    </motion.div>
  );
};

export default PlayBtn;
