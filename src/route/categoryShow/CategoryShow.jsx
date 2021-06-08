import { useLocation } from "react-router";
import PageBanner from "../../components/pageBanner/PageBanner";
import Tracks from "../../components/tracks/Tracks";
import CategoryShowLogic from "./CategoryShowLogic";

const CategoryShow = () => {
  const location = useLocation();
  const { id } = location.state;

  const { handleClickPlay, tracks } = CategoryShowLogic(id);

  const bg =
    "url(https://cdn.pixabay.com/photo/2013/07/12/18/17/equalizer-153212_960_720.png)";

  return (
    <div className="categoryShow">
      <PageBanner onClick={handleClickPlay} title={id} bg={bg} />
      <Tracks data={tracks} />
    </div>
  );
};

export default CategoryShow;
