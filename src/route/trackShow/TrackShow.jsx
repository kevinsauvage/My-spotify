import { memo, useContext } from "react";
import "./TrackShow.scss";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import { AppContext } from "../../context/AppContext";
import Loader from "react-loader-spinner";
import { MdPlayCircleFilled } from "react-icons/md";
import PlayBtn from "../../components/playBtn/PlayBtn";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const TrackShow = () => {
  const [recomendedTracks, setRecomendedTracks] = useState(); // array of recommendation tracks
  const {
    spotifyApi,
    trackToShow,
    setPlaylistToPlay,
    isLoading,
    setTrackToPlay,
    addToQueu,
    setPlaylistUri,
    setTrackShow,
    setArtistShow,
    millisToMinutesAndSeconds,
  } = useContext(AppContext);

  const getRecommendationsTrack = useCallback(async () => {
    const tracks = await spotifyApi.getRecommendations({
      seed_tracks: trackToShow?.id,
      limit: 50,
    });
    setRecomendedTracks(tracks.tracks);
    setPlaylistToPlay(tracks.tracks);
  }, [setPlaylistToPlay, spotifyApi, trackToShow]); // Get recommendation tracks for a track

  useEffect(() => {
    getRecommendationsTrack();
  }, [getRecommendationsTrack]);

  return (
    <div className="track-show">
      {isLoading ? (
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
              <PlayBtn onClick={setPlaylistUri} />
              <div className="section-header">
                <BibliothequeItemHeader name artist duration play queu />
              </div>
              {recomendedTracks &&
                recomendedTracks.map((track) => {
                  return (
                    <BibliothequeItem
                      onClick={setTrackShow}
                      id={track.id}
                      name={track.name}
                      artist={track.artists[0].name}
                      duration={millisToMinutesAndSeconds(track.duration_ms)}
                      onClickArtist={setArtistShow}
                      artistId={
                        track.track
                          ? track.track.artists[0].id
                          : track.album
                          ? track.album.artists[0].id
                          : track.artists
                          ? track.artists[0].id
                          : null
                      }
                      setTrackToPlay={setTrackToPlay}
                      uri={track.track ? track.track.uri : track.uri}
                      addToQueu={addToQueu}
                      play
                    />
                  );
                })}
            </div>
          </div>
          <div className="track-show__banner">
            {trackToShow && (
              <>
                <div
                  className="track-show__album-cover"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(2,8,17,1) 35%, rgba(2,8,17,0.8155637254901961) 100%)" +
                      "," +
                      "url(" +
                      trackToShow.album.images[1].url +
                      ")",
                  }}>
                  <div className="track-show__track-detail">
                    <h1 className="track-show__title">{trackToShow.name}</h1>
                    <Link
                      to="/Artist"
                      onClick={setArtistShow}
                      data-id={trackToShow.artists[0].id}>
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
                      onClick={setTrackToPlay}
                      data-id={trackToShow.id}
                      data-uri={trackToShow.uri}>
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
