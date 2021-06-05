import { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const {
    input,
    setInput,
    handleSidebarMenu,
    spotifyApi,
    setSearchResults,
    setIsLoading,
  } = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setIsLoading(true);
    getSearch(e);
    history.push("/Search");
    setInput("");
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };// Handle the search input change

  const getSearch = async (e) => {
    e.preventDefault();
    handleSidebarMenu();
    const searchResults = await spotifyApi.search(input, [
      "artist",
      "playlist",
      "track",
    ]);
    setSearchResults(searchResults);
    setInput("");
    setIsLoading(false);
  }; // Fetch from search input

  return { handleSubmit, handleInputChange };
};

export default SearchBarLogic;
