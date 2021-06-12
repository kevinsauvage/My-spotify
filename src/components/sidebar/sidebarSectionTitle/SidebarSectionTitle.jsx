import { motion } from "framer-motion";
import "./SidebarSectionTitle.scss";

const SidebarSectionTitle = ({ title }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sidebarSectionTitle">
      <h2 className="sidebarSectionTitle__title">{title}</h2>
    </motion.div>
  );
};

export default SidebarSectionTitle;
