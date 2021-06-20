import Tracks from "../../../components/tracks/Tracks";
import PageBanner from "../../../components/pageBanner/PageBanner";
import WentWrong from "../../../components/wentWrong/WentWrong";
import TrackShowLogic from "./TrackShowLogic";
import "./TrackShow.scss";

const TrackShow = () => {
  const {
    error,
    handlePlay,
    trackToShow,
    bg,
    recomendedTracks,
    isFollowed,
    handleSave,
  } = TrackShowLogic();

  return (
    <div className="track-show">
      {!error ? (
        <>
          <PageBanner
            onClick={handlePlay}
            bg={bg}
            data={trackToShow}
            subtitle={trackToShow?.artists?.[0]?.name}
            isFollowing={isFollowed}
            handleFollow={handleSave}
          />
          <Tracks data={recomendedTracks} title="Similar tracks" />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default TrackShow;
