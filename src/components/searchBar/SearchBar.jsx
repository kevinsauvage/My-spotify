import { useContext } from "react";
import "./SearchBar.scss";
import { CgSearchLoading } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import SearchBarLogic from "./SearchBarLogic";

const SearchBar = () => {
  const props = useContext(AppContext);
  const { handleInputChange } = SearchBarLogic();

  return (
    <div className="searchBar">
      <form
        className="searchBar__container"
        onSubmit={(e) => e.preventDefault()}>
        <input
          value={props.input}
          onChange={handleInputChange}
          className="searchBar__input"
          placeholder="Search"
          type="search"
        />
        <CgSearchLoading size={25} className="iconSearch" />
      </form>
    </div>
  );
};

export default SearchBar;
