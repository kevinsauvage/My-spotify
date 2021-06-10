import Tracks from "../../components/tracks/Tracks";
import AlbumShowLogic from "./AlbumShowLogic";
import PageBanner from "../../components/pageBanner/PageBanner";
import WentWrong from "../../components/wentWrong/WentWrong";

const AlbumShow = () => {
  const { setUri, album, tracks, error, bg } = AlbumShowLogic();

  return (
    <div className="albumShow">
      {!error ? (
        <>
          <PageBanner data={album} bg={bg} onClick={() => setUri(album?.uri)} />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default AlbumShow;
