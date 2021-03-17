import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const PlaylistModalLogic = () => {
  const props = useContext(AppContext);
  const [userPlaylists, setUserPlaylists] = useState();

  useEffect(() => {
    const playlistuser = props.playlists.filter((playlist) => {
      return playlist.owner.id === props.user.id;
    });
    setUserPlaylists(playlistuser);
  }, []);

  return { userPlaylists };
};

export default PlaylistModalLogic;
