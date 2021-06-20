import { useCallback, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../../context/AppContext";

const TrackShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page
  const [error, setError] = useState(false);
  const [isFollowed, setIsFollowed] = useState();
  const [tracks, setTracks] = useState();

  const { spotifyApi, setUri, checkIfTrackIsSaved, unSaveTrack, saveTrack } =
    useContext(AppContext);

  useEffect(() => {
    const setTrackShow = async (e) => {
      try {
        const track = await spotifyApi.getTrack(id);
        setTrackToShow(track);
      } catch (error) {
        setError(true);
      }
    }; // Function to set the track of the show page
    setTrackShow();
  }, [id, spotifyApi]);

  useEffect(() => {
    const getRecommendationsTrack = async () => {
      const tracks = await spotifyApi.getRecommendations({
        seed_tracks: id,
        limit: 50,
      });
      setTracks(tracks);
    };
    id && getRecommendationsTrack();
  }, [spotifyApi, id]);

  const checkIfSaved = useCallback(
    async (tracks) => {
      const trackWithFollow = await checkIfTrackIsSaved(tracks);
      setRecomendedTracks(trackWithFollow);
    },
    [checkIfTrackIsSaved]
  );

  useEffect(() => {
    tracks && checkIfSaved(tracks.tracks);
  }, [tracks, checkIfSaved]);

  const handlePlay = () => {
    const uris = recomendedTracks.map((track) => track.item.uri);
    setUri([trackToShow.uri, ...uris]);
  };

  const checkIfSingleTrackIsSaved = useCallback(async () => {
    const response = await spotifyApi.containsMySavedTracks([id]);
    setIsFollowed(response[0]);
  }, [id, spotifyApi]);

  const handleSave = () => {
    if (isFollowed) {
      unSaveTrack(id);
    } else {
      saveTrack(id);
    }
  };

  useEffect(() => {
    id && checkIfSingleTrackIsSaved();
  }, [checkIfSingleTrackIsSaved, id]);

  const bg = "url(" + trackToShow?.album.images[1].url + ")";

  return {
    error,
    handlePlay,
    trackToShow,
    bg,
    recomendedTracks,
    isFollowed,
    handleSave,
  };
};

export default TrackShowLogic;
