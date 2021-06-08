import { useRef } from "react";
import "./SidebarLeft.scss";
import Subtitle from "../subtitle/Subtitle";
import Scrollbar from "react-smooth-scrollbar";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import SidebarLeftLogic from "./SidebarLeftLogic";
import useClickOutside from "../../hooks/useClickOutside";
import SectionTitleSidebar from "../sectionTitleSidebar/SectionTitleSidebar";
import TextLoader from "../textLoader/TextLoader";

const SidebarLeft = () => {
  const sidebar = useRef(null);
  const { closeSidebar, data, array, sidebarLeftIsOpen, user, playlists } =
    SidebarLeftLogic();

  useClickOutside(sidebar, closeSidebar);

  return (
    <div
      ref={sidebar}
      className="sidebarLeft"
      style={{
        transform: sidebarLeftIsOpen ? "translateX(0px)" : null,
      }}>
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}
        className="scroll__content">
        <div className="sidebarLeft__userInfo padding">
          {user ? (
            <h1 className="userName">{user.email}</h1>
          ) : (
            <TextLoader height="2px" width="200px" margin="0" />
          )}
        </div>
        <SearchBar />
        <div className="sidebarLeft__userLibrary padding">
          <SectionTitleSidebar title="LIBRARY" />
          <div className="sidebarLeft__libraryItem">
            {data.map((item) => {
              return (
                <Link
                  key={item.text}
                  className="bibliotheque-item__name"
                  to={{
                    pathname: `/library/${item.text}`,
                    state: {
                      id: item.text,
                    },
                  }}>
                  <Subtitle text={item.text} />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="sidebarLeft__userPlaylist padding">
          <SectionTitleSidebar title="PLAYLISTS" />
          <div className="playlist">
            {playlists
              ? playlists.map((playlist) => {
                  return (
                    <Link
                      key={playlist.id}
                      to={{
                        pathname: `/playlist/${playlist.id}`,
                        state: {
                          id: playlist.id,
                        },
                      }}>
                      <Subtitle text={playlist.name} id={playlist.id} />
                    </Link>
                  );
                })
              : array.map((e) => {
                  return <TextLoader height="10px" width="200px" key={e} />;
                })}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default SidebarLeft;
