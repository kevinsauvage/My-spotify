import { useContext, useEffect, useState, useCallback } from "react";
import { AppContext } from "../../context/AppContext";

const BibliothequeItemLogic = (ref1, ref2, trackId) => {
  const [displayPlaylistModal, setDisplayPlaylistModal] = useState(false);
  const { spotifyApi, setUri, saveAlbum, unSaveAlbum, checkIfTrackIsSaved } =
    useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [trackIsSaved, setTrackIsSaved] = useState();

  const handleClickOutside = useCallback(
    (event) => {
      if (ref1.current && !ref1.current.contains(event.target)) {
        if (ref2.current && !ref2.current.contains(event.target)) {
          setShowMenu(false);
        }
      }
    },
    [ref1, ref2]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  // Handling save and unsave track and check if track is liked === START
  const trackiSaved = useCallback(async () => {
    const response = await checkIfTrackIsSaved(trackId);
    setTrackIsSaved(response);
  }, [checkIfTrackIsSaved, trackId]); // fetch is the track is liked by user => return a bolean

  useEffect(() => {
    trackId && trackiSaved();
  }, [trackId, trackiSaved]);

  const unSaveTrack = () => {
    spotifyApi.removeFromMySavedTracks([trackId]);
    setTimeout(() => {
      trackiSaved();
    }, 500);
  }; // unsave track and update the view

  const saveTrack = () => {
    spotifyApi.addToMySavedTracks([trackId]);
    setTimeout(() => {
      trackiSaved();
    }, 500);
  }; // Save track and update the view
  // Handling save and unsave track and check if track is liked === END

  // Handling save and unsave album and check if album is linked === START

  // Handling save and unsave album and check if album is linked === START

  const handleClickMenu = (e) => {
    setShowMenu(!showMenu);
  }; // display playlist modal on user click

  const handleClickAddToPlaylist = (e) => {
    setDisplayPlaylistModal(true);
  }; // display user playlist modal

  const handleClickPlaylist = (e, uri) => {
    const playlistId = e.currentTarget.dataset.id;
    spotifyApi.addTracksToPlaylist(playlistId, [uri]);
    e.target.insertAdjacentHTML(
      "afterEnd",
      "<p class='span-copied'>Correctly added !</p>"
    ); // Add new track to a user playlist playlist
  };

  const getRecommendationsTrack = useCallback(async () => {
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: trackId,
      limit: 50,
    });
    const uris = tracks.tracks.map((track) => track.uri);
    const track = await spotifyApi.getTrack(trackId);
    setUri([track.uri, ...uris]);
  }, [setUri, spotifyApi, trackId]);

  const addToQueu = async () => {
    const track = await spotifyApi.getTrack(trackId);
    spotifyApi.queue(track.uri);
  }; // Adding track to queue

  return {
    handleClickAddToPlaylist,
    displayPlaylistModal,
    setDisplayPlaylistModal,
    handleClickPlaylist,
    handleClickMenu,
    addToQueu,
    getRecommendationsTrack,
    showMenu,
    trackIsSaved,
    unSaveTrack,
    saveTrack,
    saveAlbum,
    unSaveAlbum,
  };
};

export default BibliothequeItemLogic;
