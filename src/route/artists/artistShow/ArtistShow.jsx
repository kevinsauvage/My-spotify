import "./ArtistShow.scss";
import ArtistShowLogic from "./ArtistShowLogic";
import Albums from "../../../components/albums/Albums";
import Tracks from "../../../components/tracks/Tracks";
import WentWrong from "../../../components/wentWrong/WentWrong";
import ArtistsRelated from "../../../components/artistsRelated/ArtistsRelated";
import ClickableTitle from "../../../components/clickableTitle/ClickableTitle";

const ArtistShow = () => {
  const {
    error,
    artistAlbums,
    setUriFromArtistTopTracks,
    isFollowing,
    handleFollow,
    artistTopTracks,
    artist,
    bg,
  } = ArtistShowLogic();

  return (
    <div className="artist-show">
      {!error ? (
        <>
          <div className="artist-show__banner">
            <div className="artist-show__banner-Wrapper">
              <div
                className="artist-show__img"
                style={{ backgroundImage: bg }}></div>
              <div className="artist-show__detail">
                <div className="artist-show__title">
                  <h1>{artist?.name}</h1>
                  <p>{artist?.followers.total} Followers</p>
                </div>
                <div className="artist-show__btns">
                  {isFollowing ? (
                    <div onClick={handleFollow} className="artist-show__btn">
                      UnFollow
                    </div>
                  ) : (
                    <div onClick={handleFollow} className="artist-show__btn">
                      Follow
                    </div>
                  )}
                  <div
                    className="artist-show__btn"
                    onClick={() => setUriFromArtistTopTracks()}>
                    Play Top Tracks
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ClickableTitle title={artist?.name + " Top Tracks"} />
          <Tracks data={artistTopTracks} title="" />
          <div>
            <div className="artist-show__bottom">
              <div className="artist-show__bottom__1">
                <ClickableTitle title={artist?.name + " Albums"} />
                <Albums data={artistAlbums} />
              </div>
              <div className="artist-show__bottom__2">
                <ArtistsRelated
                  id={artist?.id}
                  artistSelected={artist}
                  link={"Artists"}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default ArtistShow;
