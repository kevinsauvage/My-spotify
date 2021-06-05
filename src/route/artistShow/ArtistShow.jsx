import { useContext } from "react";
import "./ArtistShow.scss";
import { AppContext } from "../../context/AppContext";
import PlayBtn from "../../components/playBtn/PlayBtn";
import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import ArtistShowLogic from "./ArtistShowLogic";
import Artists from "../../components/artists/Artists";
import Albums from "../../components/albums/Albums";
import Tracks from "../../components/tracks/Tracks";
import BibliothequeTitle from "../../components/bibliothequeTitle/BibliothequeTitle";

const ArtistShow = () => {
  const { artistToShow, isFollowing } = useContext(AppContext);

  const {
    artistAlbums,
    setUriFromArtistTopTracks,
    handleFollow,
    relatedArtists,
    recomendedTracks,
    artistTopTracks,
    setUriFromArtistRecomendedTracks,
  } = ArtistShowLogic();

  console.log(recomendedTracks);

  const bg =
    "linear-gradient(0deg, rgba(2,8,17,1) 0%, rgba(2,8,17,0.8687850140056023) 50%, rgba(2,8,17,0.6194852941176471) 100%)" +
    "," +
    "url(" +
    artistToShow?.images[1].url +
    ")";

  return (
    <div className="artist-show">
      <div>
        <div
          className="artist-show__banner-image"
          style={{ backgroundImage: bg }}>
          <div className="artist-show__detail padding">
            {artistToShow && (
              <div className="artist-show__detail__title">
                <BibliothequeTitle title={artistToShow?.name} />
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
