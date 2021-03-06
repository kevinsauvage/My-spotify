import React, { memo, useContext } from "react";
import "../assets/stylesheets/pages/TrackShow.scss";
import BibliothequeItem from "../components/BibliothequeItem";
import { AppContext } from "../context/AppContext";
import Loader from "react-loader-spinner";

import { MdPlayCircleFilled } from "react-icons/md";
import PlayBtn from "../components/PlayBtn";

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
          <div className="track-show__banner">
            {props.trackToShow && (
              <>
                <div
                  className="track-show__album-cover"
                  style={{
                    backgroundImage:
                      "url(" + props.trackToShow.album.images[1].url + ")",
                  }}>
                  <div
                    className="track-show__hover"
                    onClick={props.setTrackToPlay}
                    data-id={props.trackToShow.id}
                    data-uri={props.trackToShow.uri}>
                    <p className="icon-play">
                      <MdPlayCircleFilled size={60} />
                    </p>
                  </div>
                  <div className="track-show__track-detail">
                    <div>
                      <h1 className="track-show__title">
                        {props.trackToShow.name}
                      </h1>
                      <span className="track-show__duration">
                        {props.millisToMinutesAndSeconds(
                          props.trackToShow.duration_ms
                        )}
                      </span>
                    </div>
                    <h2 className="track-show__artist-name">
                      {props.trackToShow.artists[0].name}
                    </h2>
                    <h3 className="track-show__popularity">
                      <span>Popularity</span> {props.trackToShow.popularity}
                    </h3>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="track-show__content">
            <div className="content-left">
              <h2 className="title">Similar Tracks</h2>
              <PlayBtn onClick={props.setPlaylistUri} />
              <div className="section-header">
                <BibliothequeItem
                  name="Name"
                  artistName="Artist"
                  minute="Duration"
                  preview="Play"
                  artistId="0"
                  queu="Queu"
                />
              </div>
              {props.recomendedTracks &&
                props.recomendedTracks.map((track) => {
                  return (
                    <BibliothequeItem
                      onClick={props.setTrackShow}
                      id={track.id}
                      name={track.name}
                      artistName={track.artists[0].name}
                      minute={props.millisToMinutesAndSeconds(
                        track.duration_ms
                      )}
                      href={track.preview_url}
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
                    />
                  );
                })}
            </div>
            <div className="content-right">
              <h2 className="title">Similar Artist</h2>
              <div className="section-header">
                <BibliothequeItem
                  name="Name"
                  minute="Popularity"
                  avatar="Cover"
                />
              </div>
              {props.relatedArtists &&
                props.relatedArtists.map((artist) => {
                  return (
                    <BibliothequeItem
                      img={artist.images[0] ? artist.images[0].url : ""}
                      artistName={artist.name && artist.name}
                      minute={artist.popularity && artist.popularity}
                      onClickArtist={props.setArtistShow}
                      artistId={artist.id}
                    />
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(TrackShow);
