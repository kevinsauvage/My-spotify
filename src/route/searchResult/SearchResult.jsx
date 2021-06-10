import "./SearchResult.scss";
import Artists from "../../components/artists/Artists";
import Tracks from "../../components/tracks/Tracks";
import Playlists from "../../components/playlists/Playlists";
import PageBanner from "../../components/pageBanner/PageBanner";
import WentWrong from "../../components/wentWrong/WentWrong";
import SearchResultLogic from "./SearchResultLogic";

const SearchResult = () => {
  const { bg, handlePlay, error, items } = SearchResultLogic();

  return (
    <div className="search-result">
      {!error ? (
        <>
          <PageBanner onClick={handlePlay} title="Search result" bg={bg} />
          <Tracks data={items?.tracks.items} />
          <div className="search-result__wrapper">
            <Playlists data={items?.playlists.items} />
            <Artists data={items?.artists.items} />
          </div>
        </>
      ) : (
        <WentWrong title="Oups... Nothing was found!" />
      )}
    </div>
  );
};

export default SearchResult;
