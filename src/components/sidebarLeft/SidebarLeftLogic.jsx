import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLeftLogic = () => {
  const {
    spotifyApi,
    scrollTop,
    handleSidebarMenu,
    sidebarLeftIsOpen,
    setSidebarLeftIsOpen,
    setTracks,
    topTracks,
    setNameB,
    setPlaylistToPlay,
    setDescription,
    setFollowers,
  } = useContext(AppContext);

  const [savedTracks, setSavedTracks] = useState();

  useEffect(() => {
    const getLikedTracks = async () => {
      const savedTracks = await spotifyApi.getMySavedTracks({
        limit: 50,
      });
      const itemReduce = savedTracks.items.map((item) => item.track);
      setSavedTracks(itemReduce);
    };
    getLikedTracks();
  }, [spotifyApi]);

  const setMyToptracks = () => {
    handleSidebarMenu();
    scrollTop();
    if (topTracks.lenght !== 0) {
      setTracks(topTracks);
      setNameB("Top Tracks");
    }
    setPlaylistToPlay(topTracks);
    setDescription("");
    setFollowers("");
  };

  const getRecentlyPlayed = async () => {
    handleSidebarMenu();
    setDescription("");
    setFollowers("");
    scrollTop();
    const response = await spotifyApi.getMyRecentlyPlayedTracks({
      type: "track",
      limit: 50,
    });
    const recentlyPlayed = response.items.map((item) => item.track);
    setTracks(recentlyPlayed);
    setPlaylistToPlay("");
    setNameB("Recently Played");
  }; // Fetching recently played tracks by user

  const settingSavedTracks = async () => {
    handleSidebarMenu();
    setDescription("");
    setFollowers("");
    scrollTop();
    setTracks(savedTracks);
    setPlaylistToPlay(savedTracks);
    setNameB("Liked Tracks");
  };

  const closeSidebar = () => {
    if (sidebarLeftIsOpen) {
      setSidebarLeftIsOpen(false);
    }
  };

  return {
    settingSavedTracks,
    getRecentlyPlayed,
    setMyToptracks,
    closeSidebar,
  };
};

export default SidebarLeftLogic;
