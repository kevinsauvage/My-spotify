import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import PlayBtn from "../playBtn/PlayBtn";
import "./PageBanner.scss";

const PageBanner = ({
  data,
  onClick,
  bg,
  title,
  isFollowing,
  handleFollow,
  followers,
}) => {
  console.log(followers);
  return (
    <div className="pageBanner">
      <div className="pageBanner__img">
        <div style={{ backgroundImage: bg }}></div>
      </div>
      <div className="pageBanner__detail">
        <h1 className="pageBanner__name">
          {data?.name}
          {title}
          {handleFollow ? (
            isFollowing ? (
              <span onClick={handleFollow} className="follow-btn">
                <RiUserUnfollowFill size={21} />
              </span>
            ) : (
              <span onClick={handleFollow} className="follow-btn">
                <RiUserFollowFill size={21} />
              </span>
            )
          ) : null}
        </h1>
        <div className="pageBanner__btn">
          <PlayBtn onClick={onClick} />
        </div>
        <p className="pageBanner__description">
          {data?.release_date || data?.description}
        </p>
        {followers !== undefined && (
          <p className="pageBanner__description">{followers} followers</p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
