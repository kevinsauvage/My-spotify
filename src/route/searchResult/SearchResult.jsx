import "./SearchResult.scss";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import PageBanner from "../../components/pageBanner/PageBanner";
import WentWrong from "../../components/wentWrong/WentWrong";
import SearchResultLogic from "./SearchResultLogic";
import ClickableTitle from "../../components/clickableTitle/ClickableTitle";

const SearchResult = () => {
  const { bg, handlePlay, error, tracks, artists, playlists } =
    SearchResultLogic();

  return (
    <div className="search-result">
      {!error ? (
        <>
          <PageBanner onClick={handlePlay} title="Search result" bg={bg} />
          <ClickableTitle title={"Tracks"} />
          <Tracks data={tracks} />
          <div className="search-result__wrapper">
            <Playlists data={playlists} />
            <Artists data={artists} />
          </div>
        </>
      ) : (
        <WentWrong title="Oups... Nothing was found!" />
      )}
    </div>
  );
};

export default SearchResult;
