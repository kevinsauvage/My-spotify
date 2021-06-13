import { useContext, useRef } from "react";
import "./Sidebar.scss";
import Scrollbar from "react-smooth-scrollbar";
import SidebarLogic from "./SidebarLogic";
import useClickOutside from "../../hooks/useClickOutside";
import SidebarBrowseSection from "./sidebarBrowseSection/SidebarBrowseSection";
import SidebarMyMusic from "./sidebarMyMusic/SidebarMyMusic";
import SidebarPlaylist from "./sidebarPlaylists/SidebarPlaylists";
import { useHistory } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const Sidebar = () => {
  const sidebar = useRef(null);
  const props = useContext(AppContext);

  const { closeSidebar } = SidebarLogic();
  const history = useHistory();
  useClickOutside(sidebar, closeSidebar);

  return (
    <div
      ref={sidebar}
      className="sidebar"
      style={{
        transform: props?.sidebarLeftIsOpen ? "translateX(0px)" : null,
      }}>
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}>
        <div
          className="logo"
          onClick={() =>
            history.push({
              pathname: "/",
            })
          }>
          <h1 className="logo__title">Musicly</h1>
        </div>
        <SidebarBrowseSection />
        <SidebarMyMusic />
        <SidebarPlaylist />
      </Scrollbar>
    </div>
  );
};

export default Sidebar;
