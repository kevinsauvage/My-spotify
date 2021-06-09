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
import { useEffect, useState } from "react";
import scrollTop from "../../helpers/scrollTop";
import Scrollbar from "smooth-scrollbar";

const Content = () => {
  const [scrollbar, setScrollbar] = useState();
  const location = useLocation();

  useEffect(() => {
    const scrollbar = Scrollbar.init(document.querySelector("#my-scrollbar"), {
      damping: 0.1,
      renderByPixels: true,
      alwaysShowTracks: false,
      continuousScrolling: true,
    });
    setScrollbar(scrollbar);
  }, []);

  useEffect(() => {
    scrollTop(scrollbar);
  }, [location.pathname, scrollbar]); // scroll to the top when route change

  return (
    <div className="content">
      <AnimatedSwitch className="switch-wrapper">
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
