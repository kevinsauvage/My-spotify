import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const { spotifyApi, checkIfArtistsAreFollowed, checkIfTrackIsSaved } =
    useContext(AppContext);
  const history = useHistory();
  const [changeCount, setChangeCount] = useState(0);

  const handleInputChange = async (e) => {
    setChangeCount((prev) => prev + 1);
    if (!e.target.value) {
      setChangeCount(0);
      history.go("-" + changeCount);
    }
    if (e.target.value === "") return;
    const searchResults = await spotifyApi.search(e.target.value, [
      "artist",
      "playlist",
      "track",
    ]);
    const artistsWithFollow = await checkIfArtistsAreFollowed(
      searchResults.artists.items
    );
    const tracksWithFollow = await checkIfTrackIsSaved(
      searchResults.tracks.items
    );

    var params = {
      pathname: "/search",
      search: "?query=" + e.target.value,
      state: {
        artists: artistsWithFollow,
        tracks: tracksWithFollow,
        playlists: searchResults.playlists.items,
      },
    };
    history.push(params);
  }; // Handle the search input change

  return { handleInputChange };
};

export default SearchBarLogic;
