import React, { useContext } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import TextLoader from "../../textLoader/TextLoader";
import SidebarNavItem from "../sidebarNavItem/SidebarNavItem";
import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle";
import "./SidebarPlaylists.scss";

const SidebarPlaylist = () => {
  const { userPlaylists } = useContext(AppContext);

  const array = Array.from(Array(50).keys());

  return (
    <div className="sidebarPlaylists">
      <SidebarSectionTitle title="My Playlists" />
      {userPlaylists
        ? userPlaylists.map((playlist) => {
            return (
              <Link
                key={playlist.item.id}
                to={{
                  pathname: `/Playlists/${playlist.item.name}`,
                  state: {
                    id: playlist.item.id,
                  },
                }}>
                <SidebarNavItem
                  title={playlist.item.name}
                  icon={<BsMusicNoteBeamed size={18} />}
                />
              </Link>
            );
          })
        : array.map((e) => {
            return <TextLoader height="10px" width="200px" key={e} />;
          })}
    </div>
  );
};

export default SidebarPlaylist;
