import "./Main.scss";
import Content from "../../route/content/Content";
import ControlBar from "../../components/controlBar/ControlBar";
import NavbarMobile from "../../components/navbarMobile/NavbarMobile";
import SearchBar from "../../components/searchBar/SearchBar";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import PlaylistsGenerator from "../../components/playlistsGenerator/PlaylistsGenerator";
import OfflineModal from "../../components/offlineModal/OfflineModal";

const Main = () => {
  const main = useRef(null);
  const location = useLocation();
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    main.current.scrollTo({ top: 0 });
  }, [main, location]);

  useEffect(() => {
    window.addEventListener("online", setIsOnline(true));
    window.addEventListener("offline", setIsOnline(false));
    return () => {
      window.removeEventListener("online", setIsOnline(true));
      window.removeEventListener("offline", setIsOnline(false));
    };
  }, []);

  return (
    <div ref={main} className="main">
      {isOnline && <OfflineModal />}
      <PlaylistsGenerator />
      <SearchBar />
      <Content />
      <ControlBar />
      <NavbarMobile />
    </div>
  );
};

export default Main;
