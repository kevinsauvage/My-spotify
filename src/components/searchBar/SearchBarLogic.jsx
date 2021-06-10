import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const { spotifyApi } = useContext(AppContext);
  const history = useHistory();
  const [changeCount, setChangeCount] = useState(0);

  const handleInputChange = async (e) => {
    setChangeCount((prev) => prev + 1);
    if (!e.target.value) {
      setChangeCount(0);
      history.go("-" + changeCount);
    }
    const searchResults = await spotifyApi.search(e.target.value, [
      "artist",
      "playlist",
      "track",
    ]);
    var params = {
      pathname: "/search",
      search: "?query=" + e.target.value,
      state: { items: searchResults },
    };
    history.push(params);
  }; // Handle the search input change

  return { handleInputChange };
};

export default SearchBarLogic;
