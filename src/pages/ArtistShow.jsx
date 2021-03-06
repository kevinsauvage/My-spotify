import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import "../assets/stylesheets/pages/ArtistShow.scss";
import BibliothequeItem from "../components/BibliothequeItem";
import Loader from "react-loader-spinner";
import PlayBtn from "../components/PlayBtn";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";

const ArtistShow = () => {
  const props = useContext(AppContext);

  useEffect(() => {
    if (props.artistToShow) {
      props.isFollowingArtist(props.artistToShow.id);
    }
  }, []);

  let artist = undefined;
  if (props.artistToShow) {
    artist = props.artistToShow;
  }

  const setUrl = () => {
    if (artist !== undefined) {
      return artist.images[1].url;
    }
  };

  return (
    <div className="artist-show">
      {props.isLoading ? (
        <div className="loader">
          <Loader
            type="ThreeDots"
            color="#FFF"
            height={40}
            width={40}
            timeout={1000}
          />
        </div>
      ) : (
        <>
          <div className="artist-show__first-wrapper">
            <div
              className="artist-show__banner-image"
              style={{ backgroundImage: "url(" + setUrl() + ")" }}>
              <div className="artist-show__detail">
                {artist !== undefined && (
                  <div className="artist-show__detail__title">
                    <h1 className="artist-show__detail__title">
                      {artist.name}
                    </h1>
                    {props.isFollowing ? (
                      <p onClick={props.handleFollow} className="follow-btn">
                        <RiUserUnfollowFill size={21} />
                      </p>
                    ) : (
                      <p onClick={props.handleFollow} className="follow-btn">
                        <RiUserFollowFill size={21} />
                      </p>
                    )}
                  </div>
                )}
                <div className="artist-show__detail__wrapper">
                  {artist !== undefined && <p>{artist.followers.total}</p>}
                  <p>Followers</p>
                </div>
                <div className="artist-show__playBtn">
                  <PlayBtn onClick={props.setUriFromArtistTopTracks} />
                </div>
              </div>
            </div>
            <div className="artist-show__artist-top">
              <h1 className="artist-show__artist-top__title title">
                Artist top tracks
              </h1>
              <div className="artist-show__artist-top__header section-header">
                <BibliothequeItem
                  name="Name"
                  artist="Artist"
                  minute="Duration"
                  queu="Queu"
                  preview="Play"
                />
              </div>
              <div className="artist-show____artist-top">
                {props.artistTopTracks &&
                  props.artistTopTracks.map((track) => {
                    return (
                      <BibliothequeItem
                        key={track.id + Math.random(1000)}
                        name={track.name}
                        onClick={props.setTrackShow}
                        id={track.id}
                        artist={track.artists[0].name}
                        href={track.preview_url}
                        minute={props.millisToMinutesAndSeconds(
                          track.duration_ms
                        )}
                        setTrackToPlay={props.setTrackToPlay}
                        uri={track.track ? track.track.uri : track.uri}
                        addToQueu={props.addToQueu}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="artist-show__wrapper-second">
            <div className="artist-show__left-column">
              <div className="artist-show__albums">
                <h1 className="artist-show__albums-title title">
                  Artist Albums
                </h1>
                <div className="section-header">
                  <BibliothequeItem albumName="Name" minute="Years" />
                </div>
                {props.artistAlbums &&
                  props.artistAlbums.map((album) => {
                    return (
                      <BibliothequeItem
                        key={album.id}
                        albumName={album.name}
                        minute={album.release_date.split("-")[0]}
                        onClick={props.settingAlbumToPlay}
                        albumId={album.id}
                      />
                    );
                  })}
              </div>
              <div className="artist-show__related-artist">
                <h1 className="artist-show__related-artist__title title">
                  Related Artists
                </h1>
                <div className="section-header">
                  <BibliothequeItem
                    name="Name"
                    artistId=""
                    minute="Popularity"
                  />
                </div>
                {props.relatedArtists &&
                  props.relatedArtists.map((artist) => {
                    return (
                      <BibliothequeItem
                        key={artist.id}
                        artistName={artist.name}
                        minute={artist.popularity}
                        onClickArtist={props.setArtistShow}
                        artistId={artist.id}
                      />
                    );
                  })}
              </div>
            </div>
            <div className="artist-show__right-column">
              <div className="artist-show__recomended">
                <h1 className="artist-show__recomended__title title">
                  Recomended Tracks
                </h1>
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
                        key={track.id}
                        name={track.name}
                        onClick={props.setTrackShow}
                        id={track.id}
                        href={track.preview_url}
                        artistName={track.artists[0].name}
                        minute={props.millisToMinutesAndSeconds(
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
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArtistShow;
