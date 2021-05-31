import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SidebarLeftLogic = () => {
  const props = useContext(AppContext);

  const setMyToptracks = () => {
    props.scrollTop();
    props.handleLoader();
    if (props.topTracks.lenght !== 0) {
      props.setTracks(props.topTracks);
      props.setNameB("Top Tracks");
    }
    props.setPlaylistToPlay(props.topTracks);
    props.setDescription("");
    props.setFollowers("");
  };

  const getRecentlyPlayed = async () => {
    props.setDescription("");
    props.setFollowers("");
    props.handleLoader();
    props.scrollTop();
    const recentlyPlayed = await props.spotifyApi.getMyRecentlyPlayedTracks({
      type: "track",
      limit: 50,
    });
    props.setTracks(recentlyPlayed.items);
    props.setPlaylistToPlay("");
    props.setNameB("Recently Played");
  }; // Fetching recently played tracks by user

  const settingSavedTracks = async () => {
    props.setDescription("");
    props.setFollowers("");
    props.handleLoader();
    props.scrollTop();
    props.setTracks(props.savedTracks);
    props.setPlaylistToPlay(props.savedTracks);
    props.setNameB("Liked Tracks");
  };

  const closeSidebar = () => {
    if (props.sidebarLeftIsOpen) {
      props.setSidebarLeftIsOpen(false);
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
