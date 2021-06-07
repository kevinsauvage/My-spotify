import "./ArtistShow.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import ArtistShowLogic from "./ArtistShowLogic";
import Artists from "../../components/artists/Artists";
import Albums from "../../components/albums/Albums";
import Tracks from "../../components/tracks/Tracks";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";
import { useLocation } from "react-router";

const ArtistShow = () => {
  const location = useLocation();
  const { id } = location.state;

  const {
    artistAlbums,
    setUriFromArtistTopTracks,
    handleFollow,
    relatedArtists,
    recomendedTracks,
    isFollowing,
    artistTopTracks,
    setUriFromArtistRecomendedTracks,
    artist,
    bg,
  } = ArtistShowLogic(id);

  return (
    <div className="artist-show">
      <div>
        <div
          className="artist-show__banner-image"
          style={{ backgroundImage: bg }}>
          <div className="artist-show__detail padding">
            {artist && (
              <div className="artist-show__detail__title">
                <BibliothequeTitle title={artist?.name} />
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
              {artist && <p>{artist?.followers.total}</p>}
              <p>Followers</p>
            </div>
            <div className="artist-show__playBtn">
              <PlayBtn onClick={setUriFromArtistTopTracks} />
            </div>
          </div>
        </div>
        <Tracks data={artistTopTracks} title="Top tracks" />
      </div>
      <div>
        <div className="artist-show__recomended">
          <PlayBtn onClick={setUriFromArtistRecomendedTracks} />
          <Tracks data={recomendedTracks} title="Recomended Tracks" />
        </div>
        <div className="artist-show__bottom">
          <Albums data={artistAlbums} />
          <Artists data={relatedArtists} />
        </div>
      </div>
    </div>
  );
};

export default ArtistShow;
