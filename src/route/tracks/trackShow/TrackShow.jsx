import Tracks from "../../../components/tracks/Tracks";
import PageBanner from "../../../components/pageBanner/PageBanner";
import WentWrong from "../../../components/wentWrong/WentWrong";
import TrackShowLogic from "./TrackShowLogic";

const TrackShow = () => {
  const { error, handlePlay, trackToShow, bg, recomendedTracks } =
    TrackShowLogic();

  return (
    <div className="track-show">
      {!error ? (
        <>
          <PageBanner
            onClick={handlePlay}
            bg={bg}
            data={trackToShow}
            subtitle={trackToShow?.artists?.[0]?.name}
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
