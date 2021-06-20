import Tracks from "../../../components/tracks/Tracks";
import AlbumShowLogic from "./AlbumShowLogic";
import PageBanner from "../../../components/pageBanner/PageBanner";
import WentWrong from "../../../components/wentWrong/WentWrong";
import "./AlbumShow.scss";

const AlbumShow = () => {
  const { setUri, album, tracks, error, bg, handleFollow, isFollowed } =
    AlbumShowLogic();

  return (
    <div className="albumShow">
      {!error ? (
        <>
          <PageBanner
            data={album}
            bg={bg}
            onClick={() => setUri(album?.uri)}
            isFollowing={isFollowed}
            handleFollow={handleFollow}
          />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default AlbumShow;
