import { useContext, useRef } from "react";
import "./SidebarRight.scss";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Scrollbar from "react-smooth-scrollbar";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SidebarRightLogic from "./SidebarRightLogic";
import SidebarRightCategoryWrapper from "../sidebarRightCategoryWrapper/SidebarRightCategoryWrapper";

SmoothScrollbar.use(OverscrollPlugin);

const SidebarRight = () => {
  const { sidebarRightIsOpen } = useContext(AppContext);
  const { dataConfig } = SidebarRightLogic();
  const sidebar = useRef(null);

  return (
    <div
      ref={sidebar}
      className="sidebarRight"
      style={{
        transform: sidebarRightIsOpen ? "translate(-270px)" : null,
      }}>
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}
        className="scroll__content">
        <Link to="/">
          <div className="sidebarRight__logo padding">
            <motion.h1 whileHover={{ scale: 1.05 }}>Home</motion.h1>
          </div>
        </Link>
        <div className="padding">
          {dataConfig.map((data) => {
            return (
              <SidebarRightCategoryWrapper
                key={data.id}
                data={data.items}
                link={data.link}
                fn={data.fn}
                title={data.title}
              />
            );
          })}
        </div>
      </Scrollbar>
    </div>
  );
};

export default SidebarRight;
