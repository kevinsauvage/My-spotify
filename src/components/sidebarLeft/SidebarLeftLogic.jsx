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

  // Fetching recently played tracks by user
  const getRecentlyPlayed = async () => {
    props.setDescription("");
    props.setFollowers("");
    props.handleLoader();
    props.scrollTop();
    const recentlyPlayed = await props.fetchRecentlyPlayed();
    props.setTracks(recentlyPlayed.items);
    props.setPlaylistToPlay("");
    props.setNameB("Recently Played");
  };

  const settingSavedTracks = async () => {
    props.setDescription("");
    props.setFollowers("");
    props.handleLoader();
    props.scrollTop();
    props.setTracks(props.savedTracks);
    props.setPlaylistToPlay(props.savedTracks);
    props.setNameB("Liked Tracks");
  };

  return { settingSavedTracks, getRecentlyPlayed, setMyToptracks };
};

export default SidebarLeftLogic;
