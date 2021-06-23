import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./SidebarNavItem.scss";
import { useLocation } from "react-router-dom";

const SidebarNavItem = ({ title, icon }) => {
  const [isActualRoute, setIsActualRoute] = useState(false);
  const location = useLocation();

  const styleActualRoute = {
    color: "white",
    fontWeight: 800,
  };

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    pathArray[pathArray.length - 1] === title
      ? setIsActualRoute(true)
      : setIsActualRoute(false);
  }, [location, title]);

  return (
    <motion.div
      initial={{ y: "20%", opacity: 0 }}
      animate={{ y: "0", opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sidebarNavItem">
      <div className="sidebarNavItem__icon">{icon}</div>
      <h3
        className="sidebarNavItem__title"
        style={isActualRoute ? styleActualRoute : null}>
        {title?.length > 25 ? title?.substring(0, 25) + "..." : title}
      </h3>
    </motion.div>
  );
};

export default SidebarNavItem;
