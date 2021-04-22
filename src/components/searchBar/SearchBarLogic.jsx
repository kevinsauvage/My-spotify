import { useContext } from "react";
import { useHistory } from "react-router";
import { AppContext } from "../../context/AppContext";

const SearchBarLogic = () => {
  const props = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // check if input is not empty
    if (!props.input) {
      return;
    }
    props.getSearch(e);
    history.push("/Search");
    props.setInput("");
  };
  // Handle the search input change
  const handleInputChange = (e) => {
    props.setInput(e.target.value);
  };
  return { handleSubmit, handleInputChange };
};

export default SearchBarLogic;
