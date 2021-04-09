import { useContext } from "react";
import "./SidebarLeft.scss";
import SectionTitle from "../sectionTtitle/SectionTitle";
import Subtitle from "../subtitle/Subtitle";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Scrollbar from "react-smooth-scrollbar";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import SidebarLeftLogic from "./SidebarLeftLogic";
SmoothScrollbar.use(OverscrollPlugin);

const SidebarLeft = () => {
  const props = useContext(AppContext);
  const {
    settingSavedTracks,
    getRecentlyPlayed,
    setMyToptracks,
  } = SidebarLeftLogic();
  console.log(props.user);

  return (
    <div
      className="sidebarLeft"
      style={{ transform: props.sidebarLeftIsOpen ? "scale(1)" : null }}>
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}
        className="scroll__content">
        <div className="sidebarLeft__userInfo">
          <h1 className="userName">{props.user && props.user.email}</h1>
        </div>
        <SearchBar />
        <div className="sidebarLeft__userLibrary">
          <SectionTitle title="LIBRARY" />
          <div className="libraryItem">
            <Link to="/Biblio">
              <Subtitle text="Recently Played" onClick={getRecentlyPlayed} />
            </Link>
            <Link to="/Biblio">
              <Subtitle text="Liked Tracks" onClick={settingSavedTracks} />
            </Link>
            <Link to="/Biblio">
              <Subtitle text="Top Tracks" onClick={setMyToptracks} />
            </Link>
          </div>
        </div>
        <div className="sidebarLeft__userPlaylist">
          <SectionTitle title="PLAYLISTS" />
          <div className="playlist">
            {props.playlists &&
              props.playlists.map((playlist) => {
                let name = playlist.name;
                let id = playlist.id;
                return (
                  <Link to="/Biblio" key={id}>
                    <Subtitle
                      text={name}
                      data-name={name}
                      id={id}
                      onClick={props.fetchPlaylistContent}
                    />
                  </Link>
                );
              })}
          </div>
        </div>
      </Scrollbar>
    </div>
  );
};

export default SidebarLeft;
