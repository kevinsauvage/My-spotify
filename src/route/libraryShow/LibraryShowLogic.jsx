import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const LibraryShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri, savedTracks, topTracks, checkIfTrackIsSaved } =
    useContext(AppContext);

  useEffect(() => {
    const getTopTracks = () => {
      setTracks(topTracks);
    };
    if (id === "Top Tracks") {
      getTopTracks();
    }
  }, [id, topTracks]);

  useEffect(() => {
    if (id === "Favorite") {
      setTracks(savedTracks);
    }
  }, [savedTracks, id]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      try {
        const response = await spotifyApi.getMyRecentlyPlayedTracks({
          type: "track",
          limit: 50,
        });
        const tracks = response.items.map((item) => item.track);
        const tracksWithFollow = await checkIfTrackIsSaved(tracks);
        setTracks(tracksWithFollow);
      } catch (error) {
        setError(true);
      }
    };
    if (id === "History") {
      getRecentlyPlayed();
    }
  }, [spotifyApi, id, checkIfTrackIsSaved]);

  const handleClickPlay = useCallback(() => {
    const uris = tracks.map((track) => track.item.uri);
    setUri(uris);
  }, [setUri, tracks]);

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";
  return { bg, handleClickPlay, error, tracks, id };
};

export default LibraryShowLogic;
