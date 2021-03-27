import { useContext } from "react";
import "./SearchBar.scss";
import { CgSearchLoading } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import SearchBarLogic from "./SearchBarLogic";

const SearchBar = () => {
  const props = useContext(AppContext);
  const { handleSubmit, handleInputChange } = SearchBarLogic();

  return (
    <div className="searchBar">
      <form
        type="submit"
        className="searchBar__container"
        onSubmit={handleSubmit}>
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
