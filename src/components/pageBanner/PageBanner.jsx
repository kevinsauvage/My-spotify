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

        {data?.release_date && (
          <p className="pageBanner__release">{data?.release_date}</p>
        )}
        {followers !== undefined && (
          <p className="pageBanner__followers">{followers} followers</p>
        )}

        <p className="pageBanner__description">{data?.description}</p>
        <div className="pageBanner__btn">
          {handleFollow ? (
            isFollowing ? (
              <div onClick={handleFollow} className="follow-btn">
                UnFollow
              </div>
            ) : (
              <div onClick={handleFollow} className="follow-btn">
                Follow
              </div>
            )
          ) : null}
          <PlayBtn onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
