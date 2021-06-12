import { motion } from "framer-motion";
import "./SidebarNavItem.scss";

const SidebarNavItem = ({ title, icon }) => {
  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sidebarNavItem">
      <div className="sidebarNavItem__icon">{icon}</div>
      <h3 className="sidebarNavItem__title">
        {title?.length > 25 ? title?.substring(0, 25) + "..." : title}
      </h3>
    </motion.div>
  );
};

export default SidebarNavItem;
