import React, { useContext } from "react";
import { MdPlayCircleFilled } from "react-icons/md";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import millisToMinutesAndSeconds from "../../helpers/millisToMinutesAndSeconds";
import BibliothequeTitle from "../bibliothequeTitle/BibliothequeTitle";

const TrackShowBanner = ({ trackToShow }) => {
  const { setUri } = useContext(AppContext);

  const bg =
    "linear-gradient(0deg, rgba(2,8,17,1) 35%, rgba(2,8,17,0.8155637254901961) 100%)" +
    "," +
    "url(" +
    trackToShow?.album.images[1].url +
    ")";

  return (
    <div className="track-show__album-cover" style={{ backgroundImage: bg }}>
      <div className="track-show__track-detail padding">
        <BibliothequeTitle title={trackToShow?.name} />
        <Link
          to={{
            pathname: `artist/${trackToShow.artists[0].id}`,
            state: {
              id: trackToShow.artists[0].id,
            },
          }}>
          <h2 className="track-show__artist-name">
            {trackToShow.artists[0].name}
          </h2>
        </Link>
        <h3 className="track-show__popularity">
          <span>Popularity</span> {trackToShow.popularity}
        </h3>
        <span className="track-show__duration">
          {millisToMinutesAndSeconds(trackToShow.duration_ms)}
        </span>
        <div
          className="track-show__play"
          onClick={() => setUri(trackToShow?.uri)}>
          <p className="icon-play">
            <MdPlayCircleFilled size={60} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackShowBanner;
