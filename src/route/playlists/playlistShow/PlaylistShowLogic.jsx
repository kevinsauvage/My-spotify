import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const PlaylistShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [playlist, setPlaylist] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri, savedTracks, checkIfTrackIsSaved } =
    useContext(AppContext);

  useEffect(() => {
    const fetchPlaylistContent = async () => {
      try {
        const playlist = await spotifyApi.getPlaylist(id, { limit: 50 });
        setPlaylist(playlist);
        if (playlist.tracks.items.length >= 50) {
          const tracks1 = playlist.tracks.items
            .slice(0, 50)
            .map((res) => res.track);
          console.log(tracks1);
          const tracks2 = playlist.tracks.items
            .slice(51, 100)
            .map((res) => res.track);
          console.log(tracks1);
          const tracksWithFollow1 = await checkIfTrackIsSaved(tracks1);
          const tracksWithFollow2 = await checkIfTrackIsSaved(tracks2);
          setTracks([...tracksWithFollow1, ...tracksWithFollow2]);
        } else {
          const tracks = playlist.tracks.items.map((item) => item.track);
          const tracksWithFollow = await checkIfTrackIsSaved(tracks);
          setTracks(tracksWithFollow);
        }
      } catch (error) {
        setError(true);
        console.log(error);
      }
    }; // Fetch the plyalist content when clickinng on playlist link
    fetchPlaylistContent();
  }, [spotifyApi, setTracks, id, savedTracks, checkIfTrackIsSaved]);

  const bg = "url(" + playlist?.images[0].url + ")";

  return { bg, tracks, error, setUri, playlist };
};

export default PlaylistShowLogic;
