import React, { useContext } from "react";
import "../assets/stylesheets/SidebarLeft.scss";
import SectionTitle from "./SectionTitle";
import Subtitle from "./Subtitle";
import SmoothScrollbar from "smooth-scrollbar";
import OverscrollPlugin from "smooth-scrollbar/plugins/overscroll";
import Scrollbar from "react-smooth-scrollbar";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

SmoothScrollbar.use(OverscrollPlugin);

const SidebarLeft = () => {
  const props = useContext(AppContext);

  return (
    <div className="sidebarLeft">
      <Scrollbar
        damping={0.1}
        continuousScrolling={false}
        alwaysShowTracks={false}
        className="scroll__content">
        <div className="sidebarLeft__userInfo">
          <div
            className="userAvatar"
            style={{
              backgroundImage:
                props.user && "url(" + props.user.images[0].url + ")",
            }}></div>
          <h1 className="userName">{props.user && props.user.display_name}</h1>
        </div>
        <div className="sidebarLeft__userLibrary">
          <SectionTitle title="LIBRARY" />
          <div className="libraryItem">
            <Subtitle onClick={props.handleShowSearch} text="Browse" />
            <Link to="/Biblio">
              <Subtitle
                text="Recently Played"
                onClick={props.getRecentlyPlayed}
              />
            </Link>
            <Link to="/Biblio">
              <Subtitle
                text="Liked Tracks"
                onClick={props.settingSavedTracks}
              />
            </Link>
            <Link to="/Biblio">
              <Subtitle text="Top Tracks" onClick={props.setMyToptracks} />
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
