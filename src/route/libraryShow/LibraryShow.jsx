import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import { AppContext } from "../../context/AppContext";

const LibraryShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [topTracks, setTopTracks] = useState();
  const [likedTracks, setLikedTracks] = useState();
  const [recentlyPlayedTracks, setRecentlyPlayedTracks] = useState();
  const { spotifyApi, scrollbar, handleSidebarMenu, setUri } =
    useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMyTopTracks({ limit: 50 });
      const tracks = response.items;
      setTopTracks(tracks);
    };
    if (id === "Top Tracks") {
      getTopTracks();
    } else setTopTracks(null);
  }, [spotifyApi, setTopTracks, id, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getLikedTracks = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMySavedTracks({
        limit: 50,
      });
      const tracks = response.items.map((item) => item.track);
      setLikedTracks(tracks);
    };
    if (id === "Liked Tracks") {
      getLikedTracks();
    } else setLikedTracks(null);
  }, [spotifyApi, setLikedTracks, id, scrollbar, handleSidebarMenu]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      handleSidebarMenu();
      const response = await spotifyApi.getMyRecentlyPlayedTracks({
        type: "track",
        limit: 50,
      });
      const tracks = response.items.map((item) => item.track);
      setRecentlyPlayedTracks(tracks);
    };
    if (id === "Recently Played") {
      getRecentlyPlayed();
    } else setRecentlyPlayedTracks(null);
  }, [spotifyApi, setRecentlyPlayedTracks, id, scrollbar, handleSidebarMenu]);

  const handleClickPlay = useCallback(() => {
    if (topTracks) {
      const uris = topTracks.map((track) => track.uri);
      setUri(uris);
    }
    if (recentlyPlayedTracks) {
      const uris = recentlyPlayedTracks.map((track) => track.uri);
      setUri(uris);
    }
    if (likedTracks) {
      const uris = likedTracks.map((track) => track.uri);
      setUri(uris);
    }
  }, [likedTracks, recentlyPlayedTracks, setUri, topTracks]);
  useEffect(() => {
    console.log("library render");
  }, []);

  return (
    <div className="bibliotheque">
      <div className="bibliotheque__banner">
        <div className="bibliotheque__description">
          <h1 className="bibliotheque__name">{id}</h1>
          <PlayBtn onClick={handleClickPlay} />
        </div>
      </div>
      <Tracks data={topTracks || likedTracks || recentlyPlayedTracks} />
    </div>
  );
};

export default LibraryShow;
