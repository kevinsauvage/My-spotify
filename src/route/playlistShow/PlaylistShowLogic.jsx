import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const PlaylistShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [playlist, setPlaylist] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const fetchPlaylistContent = async (e) => {
      try {
        const playlist = await spotifyApi.getPlaylist(id, { limit: 100 });
        setPlaylist(playlist);
        const tracks = playlist.tracks.items.map((res) => res.track);
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    }; // Fetch the plyalist content when clickinng on playlist link
    fetchPlaylistContent();
  }, [spotifyApi, setTracks, id]);

  const bg = "url(" + playlist?.images[0].url + ")";

  return { bg, tracks, error, setUri, playlist };
};

export default PlaylistShowLogic;
