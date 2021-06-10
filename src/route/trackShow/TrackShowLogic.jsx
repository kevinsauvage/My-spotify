import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { AppContext } from "../../context/AppContext";

const TrackShowLogic = () => {
  const location = useLocation();
  const { id } = location.state;
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page
  const [error, setError] = useState(false);
  const { spotifyApi, setUri } = useContext(AppContext);

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
      setRecomendedTracks(tracks.tracks);
    };
    getRecommendationsTrack();
  }, [spotifyApi, id]);

  const handlePlay = () => {
    const uris = recomendedTracks.map((track) => track.uri);
    setUri([trackToShow.uri, ...uris]);
  };

  const bg = "url(" + trackToShow?.album.images[1].url + ")";

  return { error, handlePlay, trackToShow, bg, recomendedTracks };
};

export default TrackShowLogic;
