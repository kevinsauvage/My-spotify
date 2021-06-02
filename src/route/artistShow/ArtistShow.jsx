import { useContext } from "react";
import "./ArtistShow.scss";
import { AppContext } from "../../context/AppContext";
import BibliothequeItem from "../../components/bibliothequeItem/BibliothequeItem";
import Loader from "react-loader-spinner";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import BibliothequeItemHeader from "../../components/bibliothequeItemHeader/BibliothequeItemHeader";
import ArtistShowLogic from "./ArtistShowLogic";

const ArtistShow = () => {
  const {
    artistToShow,
    setPlaylistUri,
    millisToMinutesAndSeconds,
    isLoading,
    isFollowing,
  } = useContext(AppContext);

  const {
    artistAlbums,
    setUriFromArtistTopTracks,
    handleFollow,
    relatedArtists,
    recomendedTracks,
    artistTopTracks,
  } = ArtistShowLogic();

  return (
    <div className="artist-show">
      {isLoading ? (
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
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(2,8,17,1) 0%, rgba(2,8,17,0.8687850140056023) 50%, rgba(2,8,17,0.6194852941176471) 100%)" +
                  "," +
                  "url(" +
                  artistToShow?.images[1].url +
                  ")",
              }}>
              <div className="artist-show__detail">
                {artistToShow && (
                  <div className="artist-show__detail__title">
                    <h1 className="artist-show__detail__title">
                      {artistToShow?.name}
                    </h1>
                    {isFollowing ? (
                      <p onClick={handleFollow} className="follow-btn">
                        <RiUserUnfollowFill size={21} />
                      </p>
                    ) : (
                      <p onClick={handleFollow} className="follow-btn">
                        <RiUserFollowFill size={21} />
                      </p>
                    )}
                  </div>
                )}
                <div className="artist-show__detail__wrapper">
                  {artistToShow && <p>{artistToShow?.followers.total}</p>}
                  <p>Followers</p>
                </div>
                <div className="artist-show__playBtn">
                  <PlayBtn onClick={setUriFromArtistTopTracks} />
                </div>
              </div>
            </div>
            <div className="artist-show__artist-top">
              <h1 className="artist-show__artist-top__title title">
                Artist top tracks
              </h1>
              <div className="artist-show__artist-top__header section-header">
                <BibliothequeItemHeader name artist duration queu play />
              </div>
              <div className="artist-show____artist-top">
                {artistTopTracks &&
                  artistTopTracks.map((track) => {
                    return (
                      <BibliothequeItem
                        key={track.id + Math.random(1000)}
                        name={track.name}
                        id={track.id}
                        artistId={track.artists[0].id}
                        artist={track.artists[0].name}
                        duration={millisToMinutesAndSeconds(track.duration_ms)}
                        uri={track.track ? track.track.uri : track.uri}
                        play
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
                  <BibliothequeItemHeader album year />
                </div>
                {artistAlbums &&
                  artistAlbums.map((album) => {
                    return (
                      <BibliothequeItem
                        key={album.id}
                        albumName={album.name}
                        year={album.release_date.split("-")[0]}
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
                  <BibliothequeItemHeader artist popularity />
                </div>
                {relatedArtists &&
                  relatedArtists.map((artist) => {
                    return (
                      <BibliothequeItem
                        key={artist.id}
                        artist={artist.name}
                        popularity={artist.popularity}
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
                <PlayBtn onClick={setPlaylistUri} />
                <div className="section-header">
                  <BibliothequeItemHeader name artist duration play queu />
                </div>
                {recomendedTracks &&
                  recomendedTracks.map((track) => {
                    return (
                      <BibliothequeItem
                        key={track.id}
                        name={track.name}
                        id={track.id}
                        artist={track.artists[0].name}
                        duration={millisToMinutesAndSeconds(track.duration_ms)}
                        artistId={
                          track.track
                            ? track.track.artists[0].id
                            : track.album
                            ? track.album.artists[0].id
                            : track.artists
                            ? track.artists[0].id
                            : null
                        }
                        uri={track.track ? track.track.uri : track.uri}
                        play
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
