import { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const { input, getSearch, setInput } = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if input is not empty
    if (!input) {
      return;
    }
    getSearch(e);
    history.push("/Search");
    setInput("");
  };
  // Handle the search input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return { handleSubmit, handleInputChange };
};

export default SearchBarLogic;
