import "./SearchBar.scss";
import { CgSearchLoading } from "react-icons/cg";
import SearchBarLogic from "./SearchBarLogic";

const SearchBar = () => {
  const { handleInputChange } = SearchBarLogic();

  return (
    <div className="searchBar">
      <form
        className="searchBar__container"
        onSubmit={(e) => e.preventDefault()}>
        <input
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
