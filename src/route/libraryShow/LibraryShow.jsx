import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import WentWrong from "../../components/wentWrong/WentWrong";
import { AppContext } from "../../context/AppContext";

const LibraryShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const [tracks, setTracks] = useState();
  const [error, setError] = useState(false);

  const { spotifyApi, handleSidebarMenu, setUri } = useContext(AppContext);

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        handleSidebarMenu();
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
  }, [spotifyApi, id, handleSidebarMenu]);

  useEffect(() => {
    const getLikedTracks = async () => {
      try {
        handleSidebarMenu();
        const response = await spotifyApi.getMySavedTracks({
          limit: 50,
        });
        const tracks = response.items.map((item) => item.track);
        setTracks(tracks);
      } catch (error) {
        setError(true);
      }
    };
    if (id === "Liked Tracks") {
      getLikedTracks();
    }
  }, [spotifyApi, id, handleSidebarMenu]);

  useEffect(() => {
    const getRecentlyPlayed = async () => {
      try {
        handleSidebarMenu();
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
    if (id === "Recently Played") {
      getRecentlyPlayed();
    }
  }, [spotifyApi, id, handleSidebarMenu]);

  const handleClickPlay = useCallback(() => {
    const uris = tracks.map((track) => track.uri);
    setUri(uris);
  }, [setUri, tracks]);

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return (
    <div className="bibliotheque">
      {!error ? (
        <>
          <PageBanner onClick={handleClickPlay} title={id} bg={bg} />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default LibraryShow;
