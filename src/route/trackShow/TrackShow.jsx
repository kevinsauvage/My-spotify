import { memo, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import Tracks from "../../components/tracks/Tracks";
import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";

const TrackShow = () => {
  const location = useLocation();
  const { id } = location.state;

  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page

  const { spotifyApi, handleSidebarMenu, setUri } = useContext(AppContext);

  useEffect(() => {
    const setTrackShow = async (e) => {
      handleSidebarMenu();
      const track = await spotifyApi.getTrack(id);
      setTrackToShow(track);
    }; // Function to set the track of the show page
    setTrackShow();
  }, [handleSidebarMenu, id, spotifyApi]);

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

  return (
    <div className="track-show">
      <PageBanner
        onClick={handlePlay}
        bg={bg}
        data={trackToShow}
        subtitle={trackToShow?.artists?.[0]?.name}
      />
      <Tracks data={recomendedTracks} title="Similar tracks" />
    </div>
  );
};

export default memo(TrackShow);
