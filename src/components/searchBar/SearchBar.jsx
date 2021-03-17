import React, { useContext } from "react";
import "./SearchBar.scss";
import { CgSearchLoading } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const props = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getSearch(e);
    history.push("/Search");
  };
  // Handle the search input change
  const handleInputChange = (e) => {
    props.setInput(e.target.value);
  };

  return (
    <div className="searchBar" style={{ opacity: props.showSearch ? 1 : 0 }}>
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
