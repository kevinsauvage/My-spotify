import { useContext, useState } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const { handleSidebarMenu, spotifyApi, setIsLoading } =
    useContext(AppContext);

  const history = useHistory();
  const [input, setInput] = useState(""); // input search

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    setIsLoading(true);
    getSearch(e);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }; // Handle the search input change

  const getSearch = async (e) => {
    e.preventDefault();
    handleSidebarMenu();
    const searchResults = await spotifyApi.search(input, [
      "artist",
      "playlist",
      "track",
    ]);
    setInput("");
    history.push({
      pathname: "/search",
      search: "?query=" + input,
      state: { items: searchResults },
    });
  }; // Fetch from search input

  return { handleSubmit, handleInputChange };
};

export default SearchBarLogic;
