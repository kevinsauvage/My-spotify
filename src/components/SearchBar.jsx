import React, { useContext } from "react";
import "../assets/stylesheets/SearchBar.scss";
import { CgSearchLoading } from "react-icons/cg";
import { AppContext } from "../context/AppContext";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
  const props = useContext(AppContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.getSearch(e);
    history.push("/Search");
  };

  return (
    <div className="searchBar" style={{ opacity: props.showSearch ? 1 : 0 }}>
      <form
        type="submit"
        className="searchBar__container"
        onSubmit={handleSubmit}>
        <input
          value={props.input}
          onChange={props.handleInputChange}
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
