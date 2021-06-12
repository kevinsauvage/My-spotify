import React, { useContext, useEffect, useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import TextLoader from "../../textLoader/TextLoader";
import SidebarNavItem from "../sidebarNavItem/SidebarNavItem";
import SidebarSectionTitle from "../sidebarSectionTitle/SidebarSectionTitle";
import "./SidebarPlaylists.scss";

const SidebarPlaylist = () => {
  const [playlists, setPlaylists] = useState();
  const { spotifyApi } = useContext(AppContext);

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
      setPlaylists(userPlaylist.items);
    };
    getUserPlaylists();
  }, [spotifyApi]);

  const array = Array.from(Array(50).keys());

  return (
    <div className="sidebarPlaylists">
      <SidebarSectionTitle title="My Playlists" />
      {playlists
        ? playlists.map((playlist) => {
            return (
              <Link
                key={playlist.id}
                to={{
                  pathname: `/Playlists/${playlist.id}`,
                  state: {
                    id: playlist.id,
                  },
                }}>
                <SidebarNavItem
                  title={playlist.name}
                  icon={<BsMusicNoteBeamed size={24} />}
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
