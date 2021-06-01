import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const PlaylistModalLogic = () => {
  const { playlists, user } = useContext(AppContext);
  const [userPlaylists, setUserPlaylists] = useState();

  useEffect(() => {
    const playlistuser = playlists.filter((playlist) => {
      return playlist.owner.id === user.id;
    });
    setUserPlaylists(playlistuser);
  }, [playlists, user]);

  return { userPlaylists };
};

export default PlaylistModalLogic;
