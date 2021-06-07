import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLeftLogic = () => {
  const { sidebarLeftIsOpen, setSidebarLeftIsOpen, spotifyApi } =
    useContext(AppContext);
  const [playlists, setPlaylists] = useState();
  const [user, setUser] = useState(); // user info

  const closeSidebar = () => {
    if (sidebarLeftIsOpen) {
      setSidebarLeftIsOpen(false);
    }
  };
  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
      setPlaylists(userPlaylist.items);
    };
    getUserPlaylists();
  }, [spotifyApi]);

  useEffect(() => {
    const getMe = async () => {
      const user = await spotifyApi.getMe();
      setUser(user);
    };
    getMe();
  }, [spotifyApi]);

  const array = Array.from(Array(50).keys());

  const data = [
    { text: "Recently Played", link: "/library" },
    { text: "Liked Tracks", link: "/library" },
    { text: "Top Tracks", link: "/library" },
  ];

  return {
    closeSidebar,
    data,
    array,
    sidebarLeftIsOpen,
    user,
    playlists,
  };
};

export default SidebarLeftLogic;
