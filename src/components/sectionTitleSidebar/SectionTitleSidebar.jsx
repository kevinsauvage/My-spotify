import { motion } from "framer-motion";
import "./SectionTitleSidebar.scss";

const SectionTitleSidebar = ({ title }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sectionTitleSidebar">
      <h2 className="sectionTitleSidebar__title">{title}</h2>
    </motion.div>
  );
};

export default SectionTitleSidebar;
