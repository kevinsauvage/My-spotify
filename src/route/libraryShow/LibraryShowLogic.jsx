import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const LibraryShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, setUri } = useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        const response = await spotifyApi.getMyTopTracks({ limit: 50 });
        const tracks = response.items;
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    };
    if (id === "Top Tracks") {
      getTopTracks();
    }
  }, [spotifyApi, id]);

  useEffect(() => {
    const getLikedTracks = async () => {
      try {
        const response = await spotifyApi.getMySavedTracks({
          limit: 50,
        });
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    };
    if (id === "Favorite") {
      getLikedTracks();
    }
  }, [spotifyApi, id]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      try {
        const response = await spotifyApi.getMyRecentlyPlayedTracks({
          type: "track",
          limit: 50,
        });
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    };
    if (id === "History") {
      getRecentlyPlayed();
    }
  }, [spotifyApi, id]);

  const handleClickPlay = useCallback(() => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  }, [setUri, tracks]);

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";
  return { bg, handleClickPlay, error, tracks, id };
};

export default LibraryShowLogic;
