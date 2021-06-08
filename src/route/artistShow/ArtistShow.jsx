import "./ArtistShow.scss";
import PlayBtn from "../../components/playBtn/PlayBtn";
import ArtistShowLogic from "./ArtistShowLogic";
import Artists from "../../components/artists/Artists";
import Albums from "../../components/albums/Albums";
import Tracks from "../../components/tracks/Tracks";
import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";

const ArtistShow = () => {
  const location = useLocation();
  const { id } = location.state;
  const {
    artistAlbums,
    setUriFromArtistTopTracks,
    relatedArtists,
    recomendedTracks,
    isFollowing,
    handleFollow,
    artistTopTracks,
    setUriFromArtistRecomendedTracks,
    artist,
    bg,
  } = ArtistShowLogic(id);

  return (
    <div className="artist-show">
      <div>
        <PageBanner
          bg={bg}
          data={artist}
          onClick={setUriFromArtistTopTracks}
          isFollowing={isFollowing}
          handleFollow={handleFollow}
          followers={artist?.followers.total}
        />
        <Tracks data={artistTopTracks} title="" />
      </div>
      <div>
        <div className="artist-show__recomended">
          <PlayBtn onClick={setUriFromArtistRecomendedTracks} />
          <Tracks data={recomendedTracks} title="Recommended Tracks" />
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
