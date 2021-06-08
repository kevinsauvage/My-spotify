import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";

const LibraryShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const { spotifyApi, scrollbar, handleSidebarMenu, setUri } =
    useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const tracks = response.items;
      setTracks(tracks);
    };
    if (id === "Top Tracks") {
      getTopTracks();
    }
  }, [spotifyApi, id, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getLikedTracks = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMySavedTracks({
        limit: 50,
      });
      const tracks = response.items.map((item) => item.track);
      setTracks(tracks);
    };
    if (id === "Liked Tracks") {
      getLikedTracks();
    }
  }, [spotifyApi, id, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMyRecentlyPlayedTracks({
        type: "track",
        limit: 50,
      });
      const tracks = response.items.map((item) => item.track);
      setTracks(tracks);
    };
    if (id === "Recently Played") {
      getRecentlyPlayed();
    }
  }, [spotifyApi, id, scrollbar, handleSidebarMenu]);

  const handleClickPlay = useCallback(() => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  }, [setUri, tracks]);

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return (
    <div className="bibliotheque">
      <PageBanner onClick={handleClickPlay} title={id} bg={bg} />
      <Tracks data={tracks} />
    </div>
  );
};

export default LibraryShow;
