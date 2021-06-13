import "./Main.scss";
import Content from "../../route/content/Content";
import ControlBar from "../../components/controlBar/ControlBar";
import NavbarMobile from "../../components/navbarMobile/NavbarMobile";
import SearchBar from "../../components/searchBar/SearchBar";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const Main = () => {
  const main = useRef(null);
  const location = useLocation();

  useEffect(() => {
    main.current.scrollTo({ top: 0 });
  }, [main, location]);

  return (
    <div ref={main} className="main">
      <SearchBar />
      <Content />
      <ControlBar />
      <NavbarMobile />
    </div>
  );
};

export default Main;
