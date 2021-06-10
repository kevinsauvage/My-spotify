import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import WentWrong from "../../components/wentWrong/WentWrong";
import LibraryShowLogic from "./LibraryShowLogic";

const LibraryShow = () => {
  const { bg, handleClickPlay, error, tracks, id } = LibraryShowLogic();

  return (
    <div className="bibliotheque">
      {!error ? (
        <>
          <PageBanner onClick={handleClickPlay} title={id} bg={bg} />
          <Tracks data={tracks} />
        </>
      ) : (
        <WentWrong title="Oupss... , something went wrong!" btn />
      )}
    </div>
  );
};

export default LibraryShow;
