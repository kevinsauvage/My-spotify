import { useLocation } from "react-router";
import PlayBtn from "../../components/playBtn/PlayBtn";
import Tracks from "../../components/tracks/Tracks";
import "./CategoryShow.scss";
import CategoryShowLogic from "./CategoryShowLogic";

const CategoryShow = () => {
  const location = useLocation();
  const { id } = location.state;

  const { handleClickPlay, tracks } = CategoryShowLogic(id);

  return (
    <div className="categoryShow">
      <div className="categoryShow__banner">
        <div className="categoryShow__img">
          <div></div>
        </div>
        <div className="categoryShow__detail">
          <h1 className="categoryShow__name">{id}</h1>
          <div className="categoryShow__btn">
            <PlayBtn onClick={handleClickPlay} />
          </div>
          <p className="categoryShow__description">descr</p>
        </div>
      </div>
      <Tracks data={tracks} />
    </div>
  );
};

export default CategoryShow;
