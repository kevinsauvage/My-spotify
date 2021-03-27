import { memo, useContext } from "react";
import "./TrackShow.scss";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import { MdPlayCircleFilled } from "react-icons/md";
import PlayBtn from "../../components/playBtn/PlayBtn";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";

const TrackShow = () => {
  const props = useContext(AppContext);
  return (
    <div className="track-show">
      {props.isLoading ? (
        <div className="loader">
          <Loader
            color="#FFF"
            type="ThreeDots"
            height={40}
            width={40}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          <div className="track-show__content">
            <div className="content-left">
              <h2 className="title">Similar Tracks</h2>
              <PlayBtn onClick={props.setPlaylistUri} />
              <div className="section-header">
                <BibliothequeItemHeader name artist duration play queu />
              </div>
              {props.recomendedTracks &&
                props.recomendedTracks.map((track) => {
                  return (
                    <BibliothequeItem
                      onClick={props.setTrackShow}
                      id={track.id}
                      name={track.name}
                      artist={track.artists[0].name}
                      duration={props.millisToMinutesAndSeconds(
                        track.duration_ms
                      )}
                      onClickArtist={props.setArtistShow}
                      artistId={
                        track.track
                          ? track.track.artists[0].id
                          : track.album
                          ? track.album.artists[0].id
                          : track.artists
                          ? track.artists[0].id
                          : null
                      }
                      setTrackToPlay={props.setTrackToPlay}
                      uri={track.track ? track.track.uri : track.uri}
                      addToQueu={props.addToQueu}
                      play
                    />
                  );
                })}
            </div>
          </div>
          <div className="track-show__banner">
            {props.trackToShow && (
              <>
                <div
                  className="track-show__album-cover"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(2,8,17,1) 35%, rgba(2,8,17,0.8155637254901961) 100%)" +
                      "," +
                      "url(" +
                      props.trackToShow.album.images[1].url +
                      ")",
                  }}>
                  <div className="track-show__track-detail">
                    <h1 className="track-show__title">
                      {props.trackToShow.name}
                    </h1>
                    <h2 className="track-show__artist-name">
                      {props.trackToShow.artists[0].name}
                    </h2>
                    <h3 className="track-show__popularity">
                      <span>Popularity</span> {props.trackToShow.popularity}
                    </h3>
                    <span className="track-show__duration">
                      {props.millisToMinutesAndSeconds(
                        props.trackToShow.duration_ms
                      )}
                    </span>
                    <div
                      className="track-show__play"
                      onClick={props.setTrackToPlay}
                      data-id={props.trackToShow.id}
                      data-uri={props.trackToShow.uri}>
                      <p className="icon-play">
                        <MdPlayCircleFilled size={60} />
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(TrackShow);
