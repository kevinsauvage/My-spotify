import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLeftLogic = () => {
  const {
    spotifyApi,
    scrollTop,
    handleLoader,
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
    scrollTop();
    handleLoader();
    if (topTracks.lenght !== 0) {
      setTracks(topTracks);
      setNameB("Top Tracks");
    }
    setPlaylistToPlay(topTracks);
    setDescription("");
    setFollowers("");
  };

  const getRecentlyPlayed = async () => {
    setDescription("");
    setFollowers("");
    handleLoader();
    scrollTop();
    const recentlyPlayed = await spotifyApi.getMyRecentlyPlayedTracks({
      type: "track",
      limit: 50,
    });
    setTracks(recentlyPlayed.items);
    setPlaylistToPlay("");
    setNameB("Recently Played");
  }; // Fetching recently played tracks by user

  const settingSavedTracks = async () => {
    setDescription("");
    setFollowers("");
    handleLoader();
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
