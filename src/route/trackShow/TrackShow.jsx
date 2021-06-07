import { memo, useContext } from "react";
import "./TrackShow.scss";
import { AppContext } from "../../context/AppContext";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { useEffect, useState } from "react";
import Tracks from "../../components/tracks/Tracks";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";
import TrackShowBanner from "../../components/trackShowBanner/TrackShowBanner";
import { useLocation } from "react-router";
import scrollTop from "../../helpers/scrollTop.js";

const TrackShow = () => {
  const location = useLocation();
  const { id } = location.state;

  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const [trackToShow, setTrackToShow] = useState(); // track to show in track show page

  const { spotifyApi, scrollbar, handleSidebarMenu, setUri } =
    useContext(AppContext);

  useEffect(() => {
    const setTrackShow = async (e) => {
      scrollTop(scrollbar);
      handleSidebarMenu();
      const track = await spotifyApi.getTrack(id);
      setTrackToShow(track);
    }; // Function to set the track of the show page
    setTrackShow();
  }, [handleSidebarMenu, id, scrollbar, spotifyApi]);

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
    setUri(uris);
  };

  return (
    <div className="track-show">
      <div className="track-show__content">
        <div className="content-left">
          <BibliothequeTitle title="Similar tracks" />
          <PlayBtn onClick={handlePlay} />
          <Tracks data={recomendedTracks} title="" />
        </div>
      </div>
      <div className="track-show__banner">
        {trackToShow && <TrackShowBanner trackToShow={trackToShow} />}
      </div>
    </div>
  );
};

export default memo(TrackShow);
