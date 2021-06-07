import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";

const PlaylistModalLogic = () => {
  const { spotifyApi } = useContext(AppContext);
  const [userPlaylists, setUserPlaylists] = useState();
  const [playlists, setPlaylists] = useState();
  const [user, setUser] = useState(); // user info

  useEffect(() => {
    const getMe = async () => {
      const user = await spotifyApi.getMe();
      setUser(user);
    };
    getMe();
  }, [spotifyApi]);

  useEffect(() => {
    const getUserPlaylists = async () => {
      const userPlaylist = await spotifyApi.getUserPlaylists({ limit: 50 });
      setPlaylists(userPlaylist.items);
    };
    getUserPlaylists();
  }, [spotifyApi]);

  useEffect(() => {
    const playlistuser = playlists?.filter((playlist) => {
      return playlist.owner.id === user.id;
    });
    setUserPlaylists(playlistuser);
  }, [playlists, user]);

  return { userPlaylists };
};

export default PlaylistModalLogic;
