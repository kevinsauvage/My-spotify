import { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const { handleSidebarMenu, spotifyApi } = useContext(AppContext);
  const history = useHistory();

  const handleInputChange = async (e) => {
    if (!e.target.value) {
      history.goBack();
    }
    handleSidebarMenu();
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
