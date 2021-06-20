import { Link } from "react-router-dom";
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
      <div className="pageBanner__wrapper">
        <div className="pageBanner__img">
          <div style={{ backgroundImage: bg }}></div>
        </div>
        <div className="pageBanner__detail">
          <h1 className="pageBanner__name">
            {data?.name}
            {title}
            <p className="pageBanner__description">{data?.description}</p>
            {data?.release_date && (
              <p className="pageBanner__release">{data?.release_date}</p>
            )}
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
          </h1>

          {followers !== undefined && (
            <p className="pageBanner__followers">{followers} followers</p>
          )}

          <div className="pageBanner__btns">
            {handleFollow ? (
              isFollowing ? (
                <div onClick={handleFollow} className="pageBanner__btn">
                  UnFollow
                </div>
              ) : (
                <div onClick={handleFollow} className="pageBanner__btn">
                  Follow
                </div>
              )
            ) : null}
            <div className="pageBanner__btn" onClick={onClick}>
              Play
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
