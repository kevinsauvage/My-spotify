import "./Content.scss";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "../home/Home";
import TrackShow from "../trackShow/TrackShow";
import Artistshow from "../artists/artistShow/ArtistShow";
import SearchResult from "../searchResult/SearchResult";
import NotFound from "../notFound/NotFound";
import AlbumShow from "../albumShow/AlbumShow";
import PlaylistShow from "../playlistShow/PlaylistShow";
import LibraryShow from "../libraryShow/LibraryShow";
import CategoryShow from "../categoryShow/CategoryShow";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import Artists from "../artists/ArtistsPage";
import AlbumsPage from "../albums/AlbumsPage";

const Content = ({ ref }) => {
  const location = useLocation();
  const { setSidebarLeftIsOpen, setSidebarRightIsOpen } =
    useContext(AppContext);

  useEffect(() => {
    setSidebarLeftIsOpen(false);
    setSidebarRightIsOpen(false);
  }, [location.pathname, setSidebarLeftIsOpen, setSidebarRightIsOpen]); // scroll to the top when route change

  return (
    <Switch className="switch-wrapper">
      <Route exact path="/" component={Home} />
      <Route path="/track/:id" component={TrackShow} />
      <Route path="/Artists/:id" component={Artistshow} />
      <Route exact path="/Artists" component={Artists} />
      <Route exact path="/Albums" component={AlbumsPage} />
      <Route path="/Albums/:id" component={AlbumShow} />
      <Route path="/playlist/:id" component={PlaylistShow} />
      <Route path="/library/:id" component={LibraryShow} />
      <Route path="/category/:id" component={CategoryShow} />
      <Route path="/search" component={SearchResult} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Content;
