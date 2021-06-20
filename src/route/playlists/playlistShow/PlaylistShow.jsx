import PageBanner from "../../../components/pageBanner/PageBanner";
import Tracks from "../../../components/tracks/Tracks";
import WentWrong from "../../../components/wentWrong/WentWrong";
import "./PlaylistShow.scss";
import PlaylistShowLogic from "./PlaylistShowLogic";
import ClickableTitle from "../../../components/clickableTitle/ClickableTitle";
import TextLoader from "../../../components/textLoader/TextLoader";

const PlaylistShow = () => {
  const { bg, tracks, error, setUri, playlist, isFollowed, handleFollow } =
    PlaylistShowLogic();

  return (
    <div className="playlistShow">
      {!error ? (
        <>
          <PageBanner
            data={playlist}
            bg={bg}
            onClick={() => setUri(playlist?.uri)}
            isFollowing={isFollowed}
            handleFollow={handleFollow}
          />
          {playlist ? (
            <ClickableTitle title={playlist?.name + " Tracks"} />
          ) : (
            <TextLoader />
          )}
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default PlaylistShow;
