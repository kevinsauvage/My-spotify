import "./Content.scss";
import { Route, useLocation } from "react-router-dom";
import { AnimatedSwitch } from "react-router-transition";
import Home from "../home/Home";
import TrackShow from "../trackShow/TrackShow";
import Artistshow from "../artistShow/ArtistShow";
import SearchResult from "../searchResult/SearchResult";
import NotFound from "../notFound/NotFound";
import AlbumShow from "../albumShow/AlbumShow";
import PlaylistShow from "../playlistShow/PlaylistShow";
import LibraryShow from "../libraryShow/LibraryShow";
import CategoryShow from "../categoryShow/CategoryShow";
import { useContext, useEffect } from "react";
import scrollTop from "../../helpers/scrollTop";
import { AppContext } from "../../context/AppContext";

const Content = () => {
  const location = useLocation();
  const { scrollbar } = useContext(AppContext);

  useEffect(() => {
    scrollTop(scrollbar);
  }, [location.pathname, scrollbar]); // scroll to the top when route change

  return (
    <div className="content">
      <AnimatedSwitch
        atEnter={{ opacity: 0, transitionDuration: "4s" }}
        atActive={{ opacity: 1, transitionDuration: "4s" }}
        atLeave={{ opacity: 0, transitionDuration: "4s" }}
        className="switch-wrapper">
        <Route exact path="/" component={Home} />
        <Route path="/track/:id" component={TrackShow} />
        <Route path="/artist/:id" component={Artistshow} />
        <Route path="/album/:id" component={AlbumShow} />
        <Route path="/playlist/:id" component={PlaylistShow} />
        <Route path="/library/:id" component={LibraryShow} />
        <Route path="/category/:id" component={CategoryShow} />
        <Route path="/search" component={SearchResult} />
        <Route component={NotFound} />
      </AnimatedSwitch>
    </div>
  );
};

export default Content;
