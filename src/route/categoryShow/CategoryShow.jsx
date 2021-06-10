import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import WentWrong from "../../components/wentWrong/WentWrong";
import CategoryShowLogic from "./CategoryShowLogic";

const CategoryShow = () => {
  const { handleClickPlay, tracks, error, bg, id } = CategoryShowLogic();

  return (
    <div className="categoryShow">
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

export default CategoryShow;
