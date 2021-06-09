import { RiUserFollowFill, RiUserUnfollowFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import PlayBtn from "../playBtn/PlayBtn";
import "./PageBanner.scss";

const PageBanner = ({
  data,
  onClick,
  bg,
  title,
  isFollowing,
  handleFollow,
  subtitle,
  followers,
}) => {
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
        {subtitle && (
          <Link
            to={{
              pathname: `/artist/${data?.artists?.[0]?.id}`,
              state: {
                id: data?.artists?.[0]?.id,
              },
            }}>
            <p className="pageBanner__subtitle"> {subtitle}</p>
          </Link>
        )}

        <div className="pageBanner__btn">
          <PlayBtn onClick={onClick} />
        </div>
        <p className="pageBanner__release">{data?.release_date}</p>
        <p className="pageBanner__description">{data?.description}</p>
        {followers !== undefined && (
          <p className="pageBanner__description">{followers} followers</p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
