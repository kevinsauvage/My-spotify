import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import WentWrong from "../../components/wentWrong/WentWrong";
import "./PlaylistShow.scss";
import PlaylistShowLogic from "./PlaylistShowLogic";

const PlaylistShow = () => {
  const { bg, tracks, error, setUri, playlist } = PlaylistShowLogic();

  return (
    <div className="playlistShow">
      {!error ? (
        <>
          <PageBanner
            data={playlist}
            bg={bg}
            onClick={() => setUri(playlist?.uri)}
          />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default PlaylistShow;
